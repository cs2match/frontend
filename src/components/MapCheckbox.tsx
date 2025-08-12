import { maps } from '../constants/map';

export default function MapCheckbox({
  nowCheck,
  setChecked,
}: {
  nowCheck: string[];
  setChecked: (mapName: string) => void;
}) {
  return (
    <div id='map_checkbox'>
      {maps.map(({ name, nameKorean }) => (
        <span key={name}>
          <input
            type='checkbox'
            name='map'
            id={`map_${name}`}
            checked={nowCheck.includes(name)}
            onChange={() => {
              setChecked(name);
            }}
          />{' '}
          <label htmlFor={`map_${name}`}>{nameKorean}</label>
        </span>
      ))}
    </div>
  );
}
