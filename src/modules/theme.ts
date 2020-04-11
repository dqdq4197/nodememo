//duck타입 redux작성
const themeMode = localStorage.getItem('theme');
const CHANGE = 'theme/CHANGE' as const;

export const change = () => ({
    type: CHANGE,
});

type ThemeAction = 
    | ReturnType<typeof change>;

// initialState type 정의
type ThemeState = {
    mode: string;
}
const initialState: ThemeState = {
    mode: themeMode || 'LightMode',
}

function theme(state: ThemeState = initialState, action: ThemeAction) {
    switch (action.type) {
        case CHANGE:
            return {mode : (state.mode ==='DarkMode' ? 'LightMode' : 'DarkMode')};
        default :
            return state;
    }
}

export default theme;