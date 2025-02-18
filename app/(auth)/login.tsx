import * as formStyles from "@/src/styles/form";
import * as imgStyles from "@/src/styles/image";
import { ApiResponse, LoginResponse } from "@/src/utils/types/type";
import { Link, useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as api from "../../api/api";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleLogin = async() => {
        const response: ApiResponse<LoginResponse> | null = await api.login(email, password);
        const loginResponse: LoginResponse | undefined = response?.data;
        if(response !== null && loginResponse !== undefined) {
            SecureStore.setItem("access_token", loginResponse.accessToken);
            SecureStore.setItem("id", loginResponse.id.toString());
            SecureStore.setItem("email", loginResponse.email);
            SecureStore.setItem("name", loginResponse.name);
            SecureStore.setItem("avatar", loginResponse.avatar);
            SecureStore.setItem("role", loginResponse.role);
        }
        if(response !== null) {
            console.log("Hello");
            router.replace("/(home)/profile");
        }
    }
    
    return (
        <ScrollView style={{flex: 1, backgroundColor: "#ffffff"}}>
            <View style={imgStyles.styles.container}>
                <Image
                    style={imgStyles.styles.squareImg}
                    source={require("../../assets/images/login.png")}
                />
            </View>

            <TextInput 
                style={formStyles.styles.input} 
                placeholder="Email" 
                keyboardType="email-address" 
                value={email} 
                onChangeText={setEmail} 
            />

            <TextInput 
                style={formStyles.styles.input} 
                placeholder="Mật khẩu" 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
            />

            <View style={formStyles.styles.container}>
                <Link 
                    href={"/(auth)/forgot"}
                    replace
                    style={{color:"blue", alignSelf: "flex-end"}}>
                    Quên mật khẩu?
                </Link>
            </View>
            
            <TouchableOpacity style={formStyles.styles.button} onPress={handleLogin}>
                <Text style={formStyles.styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={{flexDirection: "row", margin: "auto", marginTop: 15, marginBottom: 15}}>
                <Text>Chưa có tài khoản? </Text>
                <Link 
                    href={"/(auth)/register"}
                    replace
                    style={{color: "blue"}}>
                    Đăng ký ngay
                </Link>
            </View>
        </ScrollView>
    );
}