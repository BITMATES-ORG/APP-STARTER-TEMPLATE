import { useAuth } from "@/store/useAuth";
import { styles } from "@/styles/settings";
import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
const SettingsScreen = () => {
  const { user, logout } = useAuth();
  return (
    <View style={styles.body}>
      <View style={styles.profileCard}>
        <View style={styles.profilePicture}>
          <Image
            style={styles.image}
            source="https://picsum.photos/seed/696/3000/2000"
            contentFit="cover"
            transition={1000}
          />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.mainText}>{user?.username}</Text>
          <Text style={styles.secondaryText}>{user?.email}</Text>
          <Text style={styles.muted}>{user?.createdAt}</Text>
        </View>
      </View>

      <Pressable onPress={logout} style={styles.logoutBtn}>
        <Feather name="log-out" color="white" size={20} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </View>
  );
};
export default SettingsScreen;
