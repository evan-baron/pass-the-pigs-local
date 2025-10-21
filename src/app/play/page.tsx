// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './play.module.scss';

// Icon imports
import {} from '@mui/icons-material';

// Components imports

// Context imports

const Players = () => {
	return (
		<div className={styles['play-wrapper']}>
			<h2>Play</h2>
			<Link href='/play/players'>
				<button>Play a Friend</button>
			</Link>
			<Link href='/game'>
				<button>Play the Computer</button>
			</Link>
			<Link href='/game'>
				<button>Play Solo</button>
			</Link>
		</div>
	);
};

export default Players;
