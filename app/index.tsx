import { Navigator, useRouter } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";

export default function Index() {
  const router = useRouter()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-3xl text-red-600 font-bold">Termini</Text>
      <Text className="text-2xl font-semibold mb-10">Tvoji termini za privatan biznis</Text>
      <TouchableOpacity onPress={()=> router.push('./tasks')}>
      <Text className="border px-3 py-2 rounded-xl mb-5">Pogledaj taskove</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.push('./auth')}>
      <Text className="border px-3 py-2 rounded-xl" >Registruj se</Text>
      </TouchableOpacity>
    </View>
  );
}
