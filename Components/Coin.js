import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text, Card, Divider } from 'react-native-paper';

const Coin = () => {
    const route = useRoute();
    const { coinId } = route.params;
    const [coinData, setCoinData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en'
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const coin = data.find((c) => c.id === coinId);
                if (!coin) {
                    throw new Error('Coin not found');
                }
                setCoinData(coin);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoinData();
    }, [coinId]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error.message}</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            style={styles.background}
            source={require('../assets/background.png')}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Card style={styles.card}>
                    <Card.Content>
                        <View style={styles.headerContainer}>
                            <Image
                                source={{ uri: coinData.image }}
                                style={styles.image}
                            />
                            <Text style={styles.title}>{coinData.name}</Text>
                            <Text style={styles.subtitle}>({coinData.symbol.toUpperCase()})</Text>
                        </View>
                        <Divider style={styles.divider} />

                        <Text style={styles.detailText}>Current Price: ${coinData.current_price}</Text>
                        <Text style={styles.detailText}>Market Cap: ${coinData.market_cap.toLocaleString()}</Text>
                        <Text style={styles.detailText}>Market Cap Rank: #{coinData.market_cap_rank}</Text>
                        {coinData.fully_diluted_valuation && (
                            <Text style={styles.detailText}>
                                Fully Diluted Valuation: ${coinData.fully_diluted_valuation.toLocaleString()}
                            </Text>
                        )}
                        <Text style={styles.detailText}>Total Volume: ${coinData.total_volume.toLocaleString()}</Text>
                        <Text style={styles.detailText}>High 24h: ${coinData.high_24h}</Text>
                        <Text style={styles.detailText}>Low 24h: ${coinData.low_24h}</Text>
                        <Text style={styles.detailText}>Price Change 24h: ${coinData.price_change_24h}</Text>
                        <Text style={styles.detailText}>
                            Price Change Percentage 24h: {coinData.price_change_percentage_24h}%
                        </Text>
                        <Text style={styles.detailText}>
                            Market Cap Change 24h: ${coinData.market_cap_change_24h.toLocaleString()}
                        </Text>
                        <Text style={styles.detailText}>
                            Market Cap Change Percentage 24h: {coinData.market_cap_change_percentage_24h}%
                        </Text>
                        <Text style={styles.detailText}>
                            Circulating Supply: {coinData.circulating_supply.toLocaleString()}
                        </Text>
                        {coinData.total_supply && (
                            <Text style={styles.detailText}>
                                Total Supply: {coinData.total_supply.toLocaleString()}
                            </Text>
                        )}
                        {coinData.max_supply && (
                            <Text style={styles.detailText}>
                                Max Supply: {coinData.max_supply.toLocaleString()}
                            </Text>
                        )}
                        <Divider style={styles.divider} />

                        <Text style={styles.detailText}>All-Time High: ${coinData.ath}</Text>
                        <Text style={styles.detailText}>
                            All-Time High Change Percentage: {coinData.ath_change_percentage}%
                        </Text>
                        <Text style={styles.detailText}>
                            All-Time High Date: {new Date(coinData.ath_date).toLocaleDateString()}
                        </Text>
                        <Text style={styles.detailText}>All-Time Low: ${coinData.atl}</Text>
                        <Text style={styles.detailText}>
                            All-Time Low Change Percentage: {coinData.atl_change_percentage}%
                        </Text>
                        <Text style={styles.detailText}>
                            All-Time Low Date: {new Date(coinData.atl_date).toLocaleDateString()}
                        </Text>
                        <Text style={styles.lastUpdated}>
                            Last Updated: {new Date(coinData.last_updated).toLocaleString()}
                        </Text>
                    </Card.Content>
                </Card>
            </ScrollView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollViewContent: {
        padding: 20,
    },
    card: {
        borderRadius: 20,
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    divider: {
        marginVertical: 10,
        backgroundColor: '#ddd',
        height: 1,
    },
    detailText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },
    lastUpdated: {
        marginTop: 20,
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default Coin;
