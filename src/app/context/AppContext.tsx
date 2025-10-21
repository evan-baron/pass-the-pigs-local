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
			rounds: {
				round1: number | null;
				round2: number | null;
				round3: number | null;
				round4: number | null;
				round5: number | null;
				round6: number | null;
				round7: number | null;
				round8: number | null;
				round9: number | null;
				round10: number | null;
			};
			total: number;
		};
		player2: {
			rounds: {
				round1: number | null;
				round2: number | null;
				round3: number | null;
				round4: number | null;
				round5: number | null;
				round6: number | null;
				round7: number | null;
				round8: number | null;
				round9: number | null;
				round10: number | null;
			};
			total: number;
		};
	};
	gameType: 'solo' | 'computer' | 'multiplayer';
	players: {
		player1: string;
		player2: string;
	};
	setGameStatus: (status: 'not_started' | 'in_progress' | 'finished') => void;
	setGameScore: (score: AppContextType['gameScore']) => void;
	setGameType: (type: 'solo' | 'computer' | 'multiplayer') => void;
	setPlayers: (players: { player1: string; player2: string }) => void;
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
			rounds: {
				round1: null,
				round2: null,
				round3: null,
				round4: null,
				round5: null,
				round6: null,
				round7: null,
				round8: null,
				round9: null,
				round10: null,
			},
			total: 0,
		},
		player2: {
			rounds: {
				round1: null,
				round2: null,
				round3: null,
				round4: null,
				round5: null,
				round6: null,
				round7: null,
				round8: null,
				round9: null,
				round10: null,
			},
			total: 0,
		},
	});
	const [gameType, setGameType] = useState<AppContextType['gameType']>('solo');
	const [players, setPlayers] = useState<AppContextType['players']>({
		player1: '',
		player2: '',
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
				setGameStatus,
				setGameScore,
				setGameType,
				setPlayers,
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
