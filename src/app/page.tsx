// Library imports
import React from 'react';
import Link from 'next/link';

// Hooks imports

// Styles imports
import styles from './home.module.scss';

// Icon imports
import {} from '@mui/icons-material';

// Components imports

// Context imports

export default function Home() {
	return (
		<div className={styles.page}>
			<h1>Pass the Pigs</h1>
			<Link href='/play'>
				<button>New Game</button>
			</Link>
			<Link href='/game'>
				<button>Quick Start</button>
			</Link>
		</div>
	);
}
