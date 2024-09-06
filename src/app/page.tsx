import { QutanyaLogo } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 mt-32 ">
        <QutanyaLogo size={150} />
        <div className="inline-block max-w-xl text-center justify-center">
          <h1 className="text-3xl lg:text-4xl">Qutanya.id</h1>
        </div>

        <div className="flex gap-3"></div>

        <div className="mt-8"></div>
      </section>
    </DefaultLayout>
  );
}
