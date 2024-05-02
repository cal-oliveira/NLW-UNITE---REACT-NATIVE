import { Image, ImageBackground, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import { Feather } from '@expo/vector-icons'
import { MotiView } from 'moti'
import { colors } from "@/styles/colors";
import QRCode from "@/components/qrcode";
import { BadgeStore } from "@/store/badge-store";

type CredentialProps = {
    data: BadgeStore
    onChangeAvatar?: () => void,
    onShowQRCode?: () => void
}

export default function Credential({data, onChangeAvatar,onShowQRCode }: CredentialProps){

    const { height } = useWindowDimensions()

    return(
        <MotiView 
            from={{ 
                opacity: 0,
                translateY: -height,
                rotateZ: '50deg',
                rotateY: '30deg',
                rotateX: '30deg'
            }}
            animate={{ 
                opacity: 1,
                translateY: 0,
                rotateZ: '0deg',
                rotateY: '0deg',
                rotateX: '0deg'
            }}
            transition={{
                type: 'spring',
                damping: 20,
                rotateZ: {
                    damping: 15,
                    mass: 3
                }
            }}
            className="w-full self-stretch items-center"
        >
            <Image 
                source={require('@/assets/ticket/band.png')}
                className="w-24 h-52 z-10"
            />

            <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
                <ImageBackground 
                    source={require('@/assets/ticket/header.png')}
                    className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
                >
                    
                    <View className="w-full flex-row justify-between">
                        <Text className="text-zinc-50 text-sm font-bold">{data.eventTitle}</Text>
                        <Text className="text-zinc-50 text-sm font-bold">#{data.id}</Text>
                    </View>

                    <View className="w-40 h-40 bg-black rounded-full"/>
                </ImageBackground>

                {
                    data.image ? (
                        <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.7}>
                            <Image source={{ uri: data.image}} className="w-36 h-36 rounded-full -mt-24"/>
                        </TouchableOpacity>
                    ) : (
                     <View className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center">
                        <TouchableOpacity onPress={onChangeAvatar} activeOpacity={0.7}>
                            <Feather name="camera" color={colors.green[400]} size={32}/>
                        </TouchableOpacity>   
                     </View>
                    )
                }

                <Text className="font-bold text-2xl text-zinc-50 mt-4">
                    {data.name}
                </Text>

                <Text className="font-regular text-base text-zinc-300 mb-4">
                    {data.email}
                </Text>

                <QRCode value={data.checkInURL} size={120}/>

                <TouchableOpacity onPress={onShowQRCode} activeOpacity={0.7} style={{ marginTop: 24 }}>
                    <Text className="font-body text-orange-500 text-sm ">Ampliar QRCode</Text>
                </TouchableOpacity>
            </View>
        </MotiView>
    )
}