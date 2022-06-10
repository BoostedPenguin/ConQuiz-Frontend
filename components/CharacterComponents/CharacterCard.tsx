import React from 'react'
import { ImageBackground, Platform } from 'react-native'
import { Text, Button, Center, Box, Pressable, Image, } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons';


export default function CharacterCard({
    avatarName,
    avatarImageName,
    onPress,
}: {
    avatarName: string,
    avatarImageName: string,
    onPress: () => void
}) {

    return (
        <Center>
            <Pressable onPress={() => {
                onPress()
            }}>
                {({ isHovered, isFocused, isPressed }) => {
                    return (
                        <Box style={{
                            backgroundColor: "#fff",
                            borderRadius: 25
                        }}>

                            <ImageBackground imageStyle={{ borderRadius: 25, borderColor: "#fff", borderWidth: 2, opacity: 0.8 }} resizeMode="cover" source={require('../../assets/characterBackground.svg')}>

                                {/* On hover, press toggle overlay */}
                                {(isHovered || isPressed) && <Box height="100%" style={{
                                    position: "absolute",
                                    zIndex: 150,
                                    elevation: 10,
                                    backgroundColor: `rgba(0, 0, 0, ${isPressed ? 0.4 : 0.3})`,
                                    justifyContent: "center",
                                    borderRadius: 25,
                                }} width="100%" />}


                                <Box px={3} m={3}>

                                    <Image
                                        source={require(`../../assets/${avatarImageName}.svg`)}
                                        alt="Alternate Text"
                                        resizeMode="contain"
                                        size={"56"}
                                    />
                                </Box>
                                <Box style={{
                                    borderBottomLeftRadius: 25,
                                    borderBottomRightRadius: 25,
                                    borderColor: "#fff",
                                    borderBottomWidth: 2,
                                    borderLeftWidth: 2,
                                    borderRightWidth: 2
                                }} p={3} backgroundColor="#0F5688">
                                    <Text textAlign={"center"} fontSize={{ base: "md", md: "lg", lg: "xl", xl: "4xl" }} style={{ fontFamily: 'Before-Collapse', }}>
                                        {avatarName}
                                    </Text>
                                </Box>

                            </ImageBackground>
                        </Box>

                    )
                }}
            </Pressable>
        </Center>
    )
}