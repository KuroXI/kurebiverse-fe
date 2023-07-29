const Navbar = ({ name, age }: { name: string; age: number }) => {
  return (
    <div>
      <p>
        {name}, {age}
      </p>
    </div>
  );
};

export { Navbar };
