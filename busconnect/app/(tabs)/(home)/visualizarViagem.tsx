import { View } from "react-native";
import { styles } from "./viagem";
import { VisualizarLista } from "../../../components/VisualizarViagem/visualizarLista";

export default function VisualizarViagemScreen(){
  return (
    <View style={styles.container}>
      <VisualizarLista/>
    
    </View>
  )

}