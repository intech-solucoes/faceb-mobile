import React from "react";
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { 
    LandingPageScreen,
    QuemSomosScreen,
    PlanosFacebScreen, PlanoBDScreen, PlanoCDScreen,
    SimuladorNaoParticipantesScreen,
    CalendarioScreen,
    NoticiasScreen, NoticiaScreen,
    ContatoScreen,
    
    LoginScreen, 
    PlanosScreen, 
    HomeScreen, 
    DadosScreen, 
    ContribuicaoScreen,
    SaldoBDScreen,
    SaldoCDScreen,
    ContrachequeScreen,
    ContrachequeDetalheScreen,
    SimuladorBDScreen,
    SimuladorBDResultadoScreen,
    SimuladorCDScreen,
    SimuladorCDPasso2Screen,
    SimuladorCDResultadoScreen,
    RelacionamentoScreen
} from "./src/screens";

import { ScreenHeader } from "./src/components"

import SideMenu from "./src/screens/SideMenu/SideMenu";

var MainStack = createStackNavigator({
    LandingPage: LandingPageScreen,
    QuemSomos: QuemSomosScreen,
    PlanosFaceb: PlanosFacebScreen,
    PlanoBD: PlanoBDScreen,
    PlanoCD: PlanoCDScreen,
    SimuladorNaoParticipantes: SimuladorNaoParticipantesScreen,
    Calendario: CalendarioScreen,
    Noticias: NoticiasScreen,
    Noticia: NoticiaScreen,
    Contato: ContatoScreen,

    Login: LoginScreen,
    Planos: PlanosScreen,
    Home: HomeScreen,
    Dados: DadosScreen,
    Contribuicao: ContribuicaoScreen,
    SaldoBD: SaldoBDScreen,
    SaldoCD: SaldoCDScreen,
    Contracheque: ContrachequeScreen,
    ContrachequeDetalhe: ContrachequeDetalheScreen,
    SimuladorBD: SimuladorBDScreen,
    SimuladorBDResultado: SimuladorBDResultadoScreen,
    SimuladorCD: SimuladorCDScreen,
    SimuladorCDPasso2: SimuladorCDPasso2Screen,
    SimuladorCDResultado: SimuladorCDResultadoScreen,
    Relacionamento: RelacionamentoScreen
}, {
    initialRouteName: 'LandingPage',
	navigationOptions: {
        header: (navigationOptions) => <ScreenHeader {...navigationOptions} />
	}
});

const MainDrawer = createDrawerNavigator({
    DrawerStack: MainStack
}, {
	drawerPosition: 'right', 
    contentComponent: SideMenu
});

export default class App extends React.Component {
    render() {
        return (
            <MainDrawer />
        );
    }
}
