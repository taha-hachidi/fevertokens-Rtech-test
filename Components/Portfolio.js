import React, { useEffect, useState } from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Image, Linking, ImageBackground
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useRoute } from '@react-navigation/native';

const Portfolio = ({ navigation }) => {
    const route = useRoute();
    const [cryptoPortfolio, setCryptoPortfolio] = useState([]);
    const [selectedCoinId, setSelectedCoinId] = useState('');
    const [coinAmount, setCoinAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [cryptoOptions, setCryptoOptions] = useState([]);
    const [isFetchingCryptoOptions, setIsFetchingCryptoOptions] = useState(true);

    useEffect(() => {
        const fetchCryptoOptions = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
                );
                const data = await response.json();
                const options = data.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                }));
                setCryptoOptions(options);
            } catch (error) {
                console.error(error);
            } finally {
                setIsFetchingCryptoOptions(false);
            }
        };

        fetchCryptoOptions();
    }, []);

    const addToPortfolio = async () => {
        if (!selectedCoinId || !coinAmount) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
            );
            if (!response.ok) {
                Alert.alert('Error', 'Network response was not ok');
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            const coin = data.find(c => c.id === selectedCoinId);

            if (!coin) {
                Alert.alert('Error', 'Coin not found');
                setIsLoading(false);
                return;
            }

            const newCoin = {
                id: coin.id,
                name: coin.name,
                currentPrice: coin.current_price,
                amount: parseFloat(coinAmount),
            };

            setCryptoPortfolio([...cryptoPortfolio, newCoin]);
            setSelectedCoinId('');
            setCoinAmount('');
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const calculateTotalValue = () => {
        return cryptoPortfolio.reduce(
            (total, coin) => total + coin.currentPrice * coin.amount,
            0
        );
    };

    return (
        <ImageBackground source={require('../assets/Login.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.title}>Crypto Portfolio Management</Text>

                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {error && <Text style={styles.error}>Error: {error.message}</Text>}

                <FlatList
                    data={cryptoPortfolio}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.coinContainer}>
                            <Text>{item.name}</Text>
                            <Text>Amount: {item.amount}</Text>
                            <Text>Current Price: ${item.currentPrice}</Text>
                            <Text>Value: ${(item.currentPrice * item.amount).toFixed(2)}</Text>
                        </View>
                    )}
                />

                {isFetchingCryptoOptions ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <RNPickerSelect
                        onValueChange={value => setSelectedCoinId(value)}
                        items={cryptoOptions}
                        placeholder={{ label: 'Select a cryptocurrency', value: null }}
                        style={pickerSelectStyles}
                    />
                )}

                <TextInput
                    style={styles.input}
                    placeholder="Amount Owned"
                    keyboardType="numeric"
                    value={coinAmount}
                    onChangeText={setCoinAmount}
                />

                <Button
                    title="Add to Portfolio"
                    onPress={addToPortfolio}
                    disabled={isLoading}
                />

                <Text style={styles.totalValue}>
                    Total Portfolio Value: ${calculateTotalValue().toFixed(2)}
                </Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
    },
    container: {
        margin: 10,
        padding: 10,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    coinContainer: {
        marginBottom: 10,
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginBottom: 10,
    },
});

export default Portfolio;
