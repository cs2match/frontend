export default function AgeInput({
  age,
  setAge,
}: {
  age: number;
  setAge: (age: number) => void;
}) {
  return (
    <>
      <input
        type='number'
        name='age_number'
        id='age_input'
        value={age}
        disabled={age === 0}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
      <input
        type='checkbox'
        name='age_private'
        id='age_private_checkbox'
        checked={age === 0}
        onChange={() => setAge(age === 0 ? 20 : 0)}
      />
      <label htmlFor='age_private_checkbox'>공개하고 싶지 않아요</label>
    </>
  );
}
