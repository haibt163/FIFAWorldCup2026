<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {groups.map(group => (
    <div key={group.name} className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-lg font-bold">{group.name}</h3>
      <p className="mt-2">Group: {group.name}</p>
    </div>
  ))}
</div>
