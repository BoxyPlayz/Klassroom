import { useSession } from "@/lib/auth-client";
import { type ComponentChildren } from "preact";
import { useLocation } from "preact-iso";

export interface LinkProps {
    href: string;
    children?: ComponentChildren;
    requireSession?: boolean;
    fallback?: ComponentChildren;
    text?: string;
}

export default function HeaderLink(props: LinkProps) {
  const location = useLocation();
  const session = useSession();
    if (props.requireSession) {
        if (!session.data?.user) {
            return(props.fallback ?? null)
        }
    }
    return(<a href={props.href} class={location.url == props.href ? "active" : null}>
        {props.text}
        {props.children}
    </a>)
}