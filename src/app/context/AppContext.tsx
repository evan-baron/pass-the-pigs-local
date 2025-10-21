'use client';

// Libraries
import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

// Hooks imports
import { useMediaQuery } from '@mui/material';

// Define the context value type
interface AppContextType {
	isTouchDevice: boolean | undefined;
	isMobile: boolean | undefined;
	isMobileWidth: boolean | undefined;
	isSmallTablet: boolean | undefined;
	isTablet: boolean | undefined;
	isTabletWidth: boolean | undefined;
	gameStatus: 'not_started' | 'in_progress' | 'finished';
	gameScore: {
		player1: {
			round1: number;
			round2: number;
			round3: number;
			round4: number;
			round5: number;
			round6: number;
			round7: number;
			round8: number;
			round9: number;
			round10: number;
			total: number;
		};
		player2: {
			round1: number;
			round2: number;
			round3: number;
			round4: number;
			round5: number;
			round6: number;
			round7: number;
			round8: number;
			round9: number;
			round10: number;
			total: number;
		};
	};
	gameType: 'solo' | 'computer' | 'multiplayer';
	players: {
		player1: string;
		player2: string;
	};
}

// Create Context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Define the provider props type
interface ContextProviderProps {
	children: ReactNode;
}

// Create the context provider component
export const ContextProvider = ({ children }: ContextProviderProps) => {
	const [isTouchDevice, setIsTouchDevice] = useState<boolean | undefined>(
		undefined
	);

	// Determine if touch device or not
	useEffect(() => {
		const mq = window.matchMedia('(pointer: coarse)');
		setIsTouchDevice(mq.matches);

		const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
		mq.addEventListener('change', handler);

		return () => mq.removeEventListener('change', handler);
	}, []);

	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		setHydrated(true);
	}, []);

	// Screen Dimensions + is it Mobile, Tablet, or not
	const rawMobileWidth = useMediaQuery(
		'(max-width: 550px) and (orientation: portrait)'
	);
	const rawMobileHeight = useMediaQuery(
		'(max-height: 550px) and (orientation: landscape)'
	);
	const rawTabletWidth = useMediaQuery(
		'(max-width: 950px) and (orientation: portrait)'
	);
	const rawTabletHeight = useMediaQuery(
		'(max-height: 850px) and (orientation: landscape)'
	);

	const rawSmallTablet = useMediaQuery(
		'(max-height: 850px) and (max-width: 850px)'
	);

	const isMobileWidth = hydrated ? rawMobileWidth : undefined;
	const isMobileHeight = hydrated ? rawMobileHeight : undefined;
	const isTabletWidth = hydrated ? rawTabletWidth : undefined;
	const isTabletHeight = hydrated ? rawTabletHeight : undefined;

	const isMobile = isMobileWidth || isMobileHeight;
	const isSmallTablet = hydrated ? rawSmallTablet : undefined;
	const isTablet = isTabletWidth || isTabletHeight;

	// Game status and score states
	const [gameStatus, setGameStatus] =
		useState<AppContextType['gameStatus']>('not_started');
	const [gameScore, setGameScore] = useState<AppContextType['gameScore']>({
		player1: {
			round1: 0,
			round2: 0,
			round3: 0,
			round4: 0,
			round5: 0,
			round6: 0,
			round7: 0,
			round8: 0,
			round9: 0,
			round10: 0,
			total: 0,
		},
		player2: {
			round1: 0,
			round2: 0,
			round3: 0,
			round4: 0,
			round5: 0,
			round6: 0,
			round7: 0,
			round8: 0,
			round9: 0,
			round10: 0,
			total: 0,
		},
	});
	const [gameType, setGameType] = useState<AppContextType['gameType']>('solo');
	const [players, setPlayers] = useState<AppContextType['players']>({
		player1: 'Player 1',
		player2: 'Player 2',
	});

	return (
		<AppContext.Provider
			value={{
				isTouchDevice,
				isMobile,
				isMobileWidth,
				isTablet,
				isTabletWidth,
				isSmallTablet,
				gameStatus,
				gameScore,
				gameType,
				players,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Custom hook to access context
export const useAppContext = (): AppContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within a ContextProvider');
	}
	return context;
};
