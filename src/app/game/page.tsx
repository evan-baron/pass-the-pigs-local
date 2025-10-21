'use client';

// Library imports
import React from 'react';

// Hooks imports

// Styles imports
import styles from './game.module.scss';

// Icon imports
import {} from '@mui/icons-material';

// Components imports

// Context imports
import { useAppContext } from '../context/AppContext';

const Game = () => {
	const { gameScore, players, currentPlayer } = useAppContext();

	// Helper function to calculate total for a player
	const calculatePlayerTotal = (
		playerData: typeof gameScore.player1
	): number => {
		return (
			(playerData.rounds.round1 || 0) +
			(playerData.rounds.round2 || 0) +
			(playerData.rounds.round3 || 0) +
			(playerData.rounds.round4 || 0) +
			(playerData.rounds.round5 || 0) +
			(playerData.rounds.round6 || 0) +
			(playerData.rounds.round7 || 0) +
			(playerData.rounds.round8 || 0) +
			(playerData.rounds.round9 || 0) +
			(playerData.rounds.round10 || 0)
		);
	};

	// Helper function to get round score
	const getRoundScore = (
		player: 'player1' | 'player2',
		round: number
	): number | null => {
		const roundKey = `round${round}` as keyof typeof gameScore.player1.rounds;
		return gameScore[player].rounds[roundKey];
	};

	return (
		<div className={styles['game-wrapper']}>
			<h2>Game</h2>
			<h3>{players[currentPlayer]}'s Turn</h3>
			<table className={styles['score-table']}>
				<thead>
					<tr>
						<th>Round</th>
						<th>{players.player1}</th>
						<th>{players.player2}</th>
					</tr>
				</thead>
				<tbody>
					{Array.from({ length: 10 }, (_, index) => {
						const roundNumber = index + 1;
						return (
							<tr key={`round-${roundNumber}`}>
								<td>{roundNumber}.</td>
								<td>{getRoundScore('player1', roundNumber) ?? '-'}</td>
								<td>{getRoundScore('player2', roundNumber) ?? '-'}</td>
							</tr>
						);
					})}
					<tr className={styles['total-row']}>
						<td>
							<strong>Total</strong>
						</td>
						<td>
							<strong>{calculatePlayerTotal(gameScore.player1)}</strong>
						</td>
						<td>
							<strong>{calculatePlayerTotal(gameScore.player2)}</strong>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Game;
