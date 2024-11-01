import LoginForm from "@/components/shared/AuthForms/LoginForm";
import Container from "@/components/ui/Container";
import Link from "next/link";

export default async function Page() {
  return (
    <main className="w-full">
      <section className="py-40">
        <Container>
          <LoginForm />
        </Container>
      </section>
    </main>
  );
}
