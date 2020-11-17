import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { Variables } from "./src/styles";

import { 
    LandingPageScreen,
    QuemSomosScreen,
    PlanosFacebScreen, PlanoBDScreen, PlanoCDScreen, PlanoSaldadoScreen,
    SimuladorNaoParticipantesScreen, SimuladorNaoParticipantesResultadoScreen,
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
    SimuladorSaldadoScreen,
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
    PlanoSaldado: PlanoSaldadoScreen,
    SimuladorNaoParticipantes: SimuladorNaoParticipantesScreen,
    SimuladorNaoParticipantesResultado: SimuladorNaoParticipantesResultadoScreen,
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
    SimuladorSaldado: SimuladorSaldadoScreen,
    Relacionamento: RelacionamentoScreen
}, {
    initialRouteName: 'LandingPage',
    defaultNavigationOptions: {
        headerBackTitle: ' ',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: Variables.colors.primary,
        },
    },
	navigationOptions: {
        // header: (navigationOptions) => <ScreenHeader {...navigationOptions} />
	}
});

const MainDrawer = createDrawerNavigator({
    DrawerStack: MainStack
}, {
	drawerPosition: 'right', 
    contentComponent: SideMenu
});

export default createAppContainer(MainDrawer);
