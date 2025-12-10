import HeaderLink from "./HeaderLink";

export default function Header() {

  return (
    <header>
      <nav>
        <HeaderLink href="/">
          Home
        </HeaderLink>
        <HeaderLink href="/account" requireSession={true} fallback={
          <HeaderLink href="/login" text="Sign In" />
        } text="Account"/>
      </nav>
    </header>
  );
}
