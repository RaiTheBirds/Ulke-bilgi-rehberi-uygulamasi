import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ülke Bilgi Rehberi</Text>
      <Text style={styles.text}>
        Bu uygulama, REST Countries API kullanılarak geliştirilmiş bir mobil uygulamadır.
      </Text>
      <Text style={styles.text}>
        Ziyaret etmeyi planladığınız ülkelerin ismini arayarak ülkeler hakkında bilgileri görüntüleyebilir, açılan sayfadan ne yapmak istediğinizi işaretleyebilirsiniz. Örneğin bir ülkeyi halihazırda ziyaret ettiniz, bu ülkeyi kolayca listelerim içerisindeki ziyaret ettim kısmına tek butonla ekleyebilirsiniz. Ülke ile bir şey planlamıyorsanız planım yok da seçebilirsiniz, henüz ne yapacağınıza karar veremediyseniz favorilere de ekleyebilirsiniz.
      </Text>
      <Text style={styles.text}>
        2024 - 2025 Bahar Dönemi Mobil Programlama Projesi
      </Text>
            <Text style={styles.text}> 
        Her şey için çok teşekkürler Mehmet hocam :)
      </Text>
      <Text style={styles.footer}>Yıldız Teknik Üniversitesi - BTO4132</Text>
      <Text style={styles.footer}>Taha Yüksel Gökçen - 21091023</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#fff'
  },
  title: {
    fontSize:24,
    fontWeight:'bold',
    marginBottom:16,
  },
  text: {
    fontSize:15,
    textAlign:'center',
    marginBottom:12,
  },
  footer: {
    marginTop:30,
    fontSize:14,
    color:'gray',
  }
});
export default AboutScreen