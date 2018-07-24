import { Variables } from "../../styles";

export default {
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: Variables.colors.primary,
        flex: 1,
        padding: 50,
        paddingTop: 70,
        alignItems: "center"
    },
    headerImage: {
        height: 80,
        width: 200
    },
    navSectionStyle: {
        paddingTop: 10
    },
    navItemStyle: {
        padding: 10,
        flex: 1, 
        flexDirection: 'row'
    },
    navIcon: {
        width: 26,
        height: 26,
        marginRight: 10
    },
    navText: {
        marginTop: 5
    },
    footerContainer: {
        padding: 20
    }
};