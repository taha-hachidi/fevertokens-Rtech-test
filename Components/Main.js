import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Main = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                        sparkline: false,
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Portfolio')}
                        style={styles.portfolioButton}
                    >
                        <Image source={require('../assets/portfolio.png')} style={styles.portfolioIcon} />
                        <Text style={styles.portfolioText}>Portfolio</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.loadingContent}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Loading ...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Portfolio')}
                    style={styles.portfolioButton}
                >
                    <Image source={require('../assets/portfolio.png')} style={styles.portfolioIcon} />
                    <Text style={styles.portfolioText}>Portfolio</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView}>
                {data.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => navigation.navigate('Coin', { coinId: item.id })}
                        style={styles.itemContainer}
                    >
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: item.image }} />
                            <View style={styles.overlay}>
                                <Text style={styles.overlayText}>{item.name}</Text>
                            </View>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.subtitle}>Current Price: ${item.current_price}</Text>
                            <Text style={styles.subtitle}>Change (24h): {item.market_cap_change_percentage_24h}%</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    headerContainer: {
        padding: 10,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    portfolioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
    },
    portfolioIcon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    portfolioText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#007AFF',
    },
    loadingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333333',
    },
    scrollView: {
        paddingHorizontal: 10,
        marginTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 5,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    overlayText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '600',
    },
    textContainer: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#555555',
    },
});

export default Main;