import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colorSet: {
        background: string;
        blackWhite: {
            gray100: string;
            gray300: string;
            gray500: string;
            gray700: string;
            gray900: string;
            black: string;
            white: string;
        },
        main: string;
        poin: string;
    },
    textSet : {
        color: {
            gray100: string;
            gray300: string;
            gray500: string;
            gray700: string;
            gray900: string;
            black: string;
            white: string;
        },
        size: {
            sm: string;
            md: string;
            lg: string;
            title: string;
        },
        weight: {
            light: number;
            regular: number; 
            bold: number; 
            extra_bold: number; 
        }
    },
    boxSet: {
        borderRadius: string;
        box_shadow: string;
        height: {
            sm: string;
            md: string;
            lg: string;
        }
    },
    paddingSet: {
        pd_4: string;
        pd_8: string;
        pd_12: string;
        pd_16: string;
        pd_20: string;
    }
  }
}