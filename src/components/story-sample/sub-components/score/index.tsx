import './index.scss';

interface ScoreProps {
    score: number;
}

export const Score = (props: ScoreProps) => {
    const { score } = props;
    return <div className="score-wrapper">
        <span className="score-number">{score}</span>
        <span className="score-text">point{score > 1 ? 's' : ''}</span>
    </div>
}