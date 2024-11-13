export default function Button({
  children,
  onClick,
  // disable
}) {
  return (
    <>
      <button
        className="button btn-transparent"
        onClick={onClick}
        // disabled={disable}
        type="button"
      >
        {children}
      </button>
    </>
  );
}
