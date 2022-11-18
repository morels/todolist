import React from "react";
import styles from "./title.module.css";

interface Props extends React.PropsWithChildren<{}>{}

const Title: React.FC<Props> = ({ children }) => <h1 className={styles.title}>{children}</h1>;

export { Title };
