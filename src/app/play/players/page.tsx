'use client';

// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './players.module.scss';

// Icon imports
import {} from '@mui/icons-material';

// Components imports

// Context imports
import { useAppContext } from '@/app/context/AppContext';

const Players = () => {
	const { players, setPlayers } = useAppContext();

	const insertDefaultNames = () => {
		const updatedPlayers = { ...players };

		(Object.keys(players) as Array<keyof typeof players>).forEach(
			(key, index) => {
				if (!players[key]) {
					updatedPlayers[key] = `Player ${index + 1}`;
				}
			}
		);

		setPlayers(updatedPlayers);
	};

	return (
		<div className={styles['players-wrapper']}>
			<h2>Players</h2>
			<div className={styles['input-group']}>
				<label htmlFor='player1'>Player 1:</label>
				<input
					type='text'
					id='player1'
					name='player1'
					placeholder='Player 1'
					value={players.player1}
					onChange={(e) => setPlayers({ ...players, player1: e.target.value })}
				/>
			</div>
			<div className={styles['input-group']}>
				<label htmlFor='player2'>Player 2:</label>
				<input
					type='text'
					id='player2'
					name='player2'
					placeholder='Player 2'
					value={players.player2}
					onChange={(e) => setPlayers({ ...players, player2: e.target.value })}
				/>
			</div>
			<Link href='/game'>
				<button onClick={insertDefaultNames}>Start Game</button>
			</Link>
			<Link href='/play'>
				<button>Back</button>
			</Link>
		</div>
	);
};

export default Players;
