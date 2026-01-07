import styles from "./AIResultPanel.module.css";
import { CheckCircle, Warning, Error as ErrorIcon } from "@mui/icons-material";

function AIResultPanel({ result }) {
    if (!result) return null;

    // Risk-level colors
    const getRiskColor = (score) => {
        if (score >= 75) return styles.high;
        if (score >= 40) return styles.medium;
        return styles.low;
    };

    return (
        <div className={`${styles.panel} ${styles.fadeIn}`}>
            <h2 className={styles.title}>AI Security Analysis</h2>

            {/* Risk Score Badge */}
            <div className={`${styles.riskCircle} ${getRiskColor(result.riskScore)}`}>
                <span>{result.riskScore}</span>
            </div>

            {/* Summary */}
            <div className={styles.section}>
                <h3>Summary</h3>
                <p>{result.summary}</p>
            </div>

            {/* Risk Factors */}
            <div className={styles.section}>
                <h3>Risk Factors</h3>
                <ul>
                    {result.riskFactors?.map((factor, i) => (
                        <li key={i}>
                            <Warning fontSize="small" className={styles.iconWarning} />
                            {factor}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recommendations */}
            <div className={styles.section}>
                <h3>Recommended Actions</h3>
                <ul>
                    {result.recommendations?.map((rec, i) => (
                        <li key={i}>
                            <CheckCircle fontSize="small" className={styles.iconCheck} />
                            {rec}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AIResultPanel;