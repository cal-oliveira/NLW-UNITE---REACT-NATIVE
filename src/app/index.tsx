
import { colors } from '@/styles/colors'

import { View, Image, StatusBar, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, Redirect } from 'expo-router'
import { useState } from 'react'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

import { api } from '@/server/api'
import { useBadgeStore } from '@/store/badge-store'

export default function Home(){

    const [code,setCode] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const badgeStore = useBadgeStore()

    async function handleAccessCredential(){
        try {
            if(!code.trim()){
                return Alert.alert('Credencial','Informe o código do ingresso!')
            }
    
            setIsloading(true)

            const { data } = await api.get(`/attendees/${code}/badge`)
            badgeStore.save(data.badge)

        } catch(error){
            console.log(error)
            setIsloading(false)
            Alert.alert("Ingresso","Ingresso não encontrado!")
        } 
    }

    if(badgeStore.data?.checkInURL){
        return <Redirect href="/ticket"/>
    }

    return(
        <View className='flex-1 bg-green-500 items-center justify-center p-8'>
            <StatusBar barStyle='light-content'/>
            <Image 
                source={require('@/assets/logo.png')}
                className='h-16'
                resizeMode='contain'
            />

            <View className='w-full mt-12 gap-3'>
                <Input>
                    <MaterialCommunityIcons 
                        name='ticket-confirmation-outline'
                        size={20}
                        color={colors.green[200]}
                    />
                    <Input.Field 
                        placeholder='Código do ingresso' 
                        onChangeText={setCode}
                    />
                </Input>

                <Button 
                    title='Acessar credencial'
                    onPress={handleAccessCredential} 
                    isLoading={isLoading} 
                />
                <Link  className='text-gray-100 text-base font-bold text-center mt-8' href={'/register'}>
                    Ainda não possui ingresso ? 
                </Link>
            </View>
        </View>
    )
}