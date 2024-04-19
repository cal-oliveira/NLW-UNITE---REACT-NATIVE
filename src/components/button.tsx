import { ActivityIndicator, Text, TouchableOpacity, View, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
    title: string,
    isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: ButtonProps){
    return(
        <View className='h-14 w-full bg-orange-500 border border-green-400 rounded-lg items-center justify-center'>
            <TouchableOpacity disabled={isLoading} style={{ width: '100%', alignItems: 'center' }} {...rest} >
                {isLoading ? (
                        <ActivityIndicator className="text-green-500"/>
                    ) : (
                        <Text className="font-bold text-lg text-green-500 uppercase">{title}</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}