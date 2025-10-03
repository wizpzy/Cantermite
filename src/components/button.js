import styles from "./button.module.css";

export default function Button({ children, onClick, type = "button", disabled = false, className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={styles.button}
        >
            {children}
        </button>
    );
}