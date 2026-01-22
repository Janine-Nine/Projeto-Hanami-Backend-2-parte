export function Filters({ onChange }: any) {
  return (
    <div className="flex gap-4 mb-4">
      <input type="date" onChange={e => onChange('start', e.target.value)} />
      <input type="date" onChange={e => onChange('end', e.target.value)} />
      <select onChange={e => onChange('region', e.target.value)}>
        <option value="">Todas regiões</option>
        <option value="Sudeste">Sudeste</option>
        <option value="Sul">Sul</option>
        <option value="Nordeste">Nordeste</option>
      </select>
    </div>
  );
}
