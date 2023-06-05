import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native'

import { images, icons, COLORS, FONTS, SIZES } from '../constant';
import {screenNames} from '../constants';
const ScrollableTab = ({ tabList, selectedTab, onPress }) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginHorizontal: SIZES.padding }}
            onPress={() => onPress(item)}
        >
            <Text style={{ color: COLORS.secondary, ...FONTS.body2 }}>{item.name}</Text>

            {
                selectedTab.id == item.id &&
                <View style={{ alignItems: 'center', marginTop: SIZES.base }}>
                    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: COLORS.blue }}></View>
                </View>
            }
        </TouchableOpacity>
    );

    return (
        <View style={{ marginTop: SIZES.padding }}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={tabList}
                renderItem={renderItem}
                keyExtractor={item => `${item.id}`}
            />
        </View>
    )
}

const ScrollableCard = ({ navigation, productList }) => {

    const renderCard = ({ item }) => (
        <TouchableOpacity
            style={{ marginLeft: SIZES.padding }}
            onPress={() => navigation.navigate( item.productId == 1? screenNames.DATA_COLLECTION_SCREEN : screenNames.NAVIGATION_HOME_SCREEN)}
        >
            <View style={{ width: SIZES.width / 2.3, height:600}}>
                <Image
                    source={item.image}
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%', borderRadius: SIZES.radius * 2 }}
                />

                <View style={{ position: 'absolute', top: 15, left: '10%', right: '10%' }}>
                    <Text style={{ marginTop: SIZES.base, color: COLORS.white, ...FONTS.h2 }}>{item.productName}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <FlatList
                horizontal
                data={productList}
                renderItem={renderCard}
                keyExtractor={item => `${item.productId}`}
            />
        </View>
    )
}

const Home = ({ navigation }) => {

    const [selectedTab, setSelectedTab] = React.useState({
        id: 0,
        name: "Chair",
        title: 'chairs',
        productList: [
            {
                productId: 1,
                productName: 'Record',
                price: 10.00,
                image: images.greenChair,
            },
            {
                productId: 2,
                productName: 'Indoor Navigation',
                price: 10.00,
                image: images.redChair,
            },

        ]
    })

    // Render

    function renderHeader() {
        return (
            <View style={{ paddingHorizontal: SIZES.padding }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                        <TouchableOpacity
                            onPress={() => console.log("Menu on clicked")}
                        >
                            <Image
                                source={icons.menu}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <TouchableOpacity
                            onPress={() => { console.log("Cart on clicked") }}
                        >
                            <Image
                                source={icons.cart}
                                resizeMode="contain"
                                style={{
                                    width: 25,
                                    height: 25
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    function renderTitle(title) {
        return (
            <View style={{ marginTop: SIZES.padding, marginHorizontal: SIZES.padding }}>
                <Text style={{ color: COLORS.black, ...FONTS.largeTitle }}>Indoor Navigation</Text>
                <Text style={{ color: COLORS.black, ...FONTS.largeTitle }}>System</Text>
            </View>
        )
    }

    function renderPromotionCard() {
        return (
            <View
                style={[styles.shadow, {
                    flexDirection: 'row',
                    marginHorizontal: SIZES.padding,
                    padding: SIZES.radius,
                    height: 110,
                    borderRadius: 20,
                    backgroundColor: COLORS.white
                }]}
            >
                <View
                    style={{
                        width: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: COLORS.lightGray2,
                        borderRadius: 20
                    }}
                >
                    <Image
                        source={images.sofa}
                        resizeMode="contain"
                        style={{
                            width: '60%',
                            height: '60%'
                        }}
                    />
                </View>

                {/* Wordings section */}
                <View style={{ flex: 1, marginLeft: SIZES.radius, justifyContent: 'center' }}>
                    <Text style={{ ...FONTS.h2 }}>Special Offer</Text>
                    <Text style={{ ...FONTS.body3 }}>Adding to your cart</Text>
                </View>

                {/* Button */}
                <View style={{ marginRight: SIZES.radius, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.primary,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '70%',
                            width: 40,
                            borderRadius: 10
                        }}
                        onPress={() => { console.log("Promo on clicked") }}
                    >
                        <Image
                            source={icons.chevron}
                            resizeMode="contain"
                            style={{
                                height: '50%',
                                width: '50%'
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>

            {renderTitle(selectedTab.title)}

            <View style={{ flex: 1, marginTop: 20 }}>
                <ScrollableCard
                    navigation={navigation}
                    productList={selectedTab.productList}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    }
})

export default Home;