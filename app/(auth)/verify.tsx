import OTPInput from "@/src/components/OTPInput";
import * as formStyles from "@/src/styles/form";
import * as imgStyles from "@/src/styles/image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as api from "../../api/api";

export default function Verify() {
    const [otpValue, setOtpValue] = useState("");
    const { email } = useLocalSearchParams();
    const router = useRouter();
    const emailString: string = email as string;
    const handleOTPComplete = (otp: string) => {
        setOtpValue(otp);
        console.log(otp);
    }
    const handleConfirmOTP = async () => {
        const response: any = await api.verifyOTP(emailString, otpValue);
        alert("Xác nhận thành công");
        router.replace("/(auth)/login");
    }
    const handleResendOTP = async () => {
        const response: any = await api.resendOTP(emailString);
        alert("OTP vừa được gửi lại");
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <View style={imgStyles.styles.container}>
                <Image
                    style={imgStyles.styles.squareImg}
                    source={require("../../assets/images/verify_otp.png")}
                />
            </View>
            <Text
                style={{ fontSize: 20, fontWeight: "bold", margin: "auto" }}>
                Hãy kiểm tra email của bạn
            </Text>
            <Text
                style={{ margin: "auto", marginTop: 30 }}>
                Nhập OTP mà chúng tôi đã gửi qua email
            </Text>

            <OTPInput length={6} onOtpComplete={handleOTPComplete} />

            <TouchableOpacity style={[formStyles.styles.button, { marginTop: 25 }]} onPress={handleConfirmOTP}>
                <Text style={formStyles.styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[formStyles.styles.button, { marginTop: 25 }]} onPress={handleResendOTP}>
                <Text style={formStyles.styles.buttonText}>Gửi lại OTP</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}