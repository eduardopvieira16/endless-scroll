import { memo } from 'react';
import type { Person } from '../types/user';
import styles from './PersonCard.module.scss';
interface PersonCardProps {
    person: Person;
}
function PersonCardComponent({ person }: PersonCardProps) {
    return (<article className={styles.card}>
      <img src={person.avatar} alt="" loading="lazy" decoding="async" width="80" height="80"/>
      <div className={styles.copy}>
        <span className={styles.status}>Disponível para conectar</span>
        <h3>{person.name}</h3>
        <p>{person.city}, {person.country}</p>
        <a href={`mailto:${person.email}`}>{person.email}</a>
      </div>
      <span className={styles.member}>desde {person.memberSince}</span>
    </article>);
}
export const PersonCard = memo(PersonCardComponent);
