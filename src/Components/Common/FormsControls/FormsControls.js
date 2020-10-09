import React from "react";
import styles from './FormsControls.module.css';

export const Textarea = (props) => {
    const hasError = props.meta.touched && props.meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : ' ')}>
            <div>
                <textarea className={styles.textarea} {...props.input} {...props} />
            </div>
            {hasError && <span>{props.meta.error}</span>}
        </div>
    )
}
export const Input = (props) => {

    const hasError = props.meta.touched && props.meta.error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : ' ')}>
            <div>
                <input {...props.input} {...props} />
            </div>
            {hasError && <span>{props.meta.error}</span>}
        </div>
    )
}
