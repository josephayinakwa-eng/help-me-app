import { ScreenHeader } from "@/components/screen-header"
import { ServicesSearch } from "./services-search"

export default function ServicesPage() {
  return (
    <>
      <ScreenHeader title="Find a Service" subtitle="Search everything in one place" backHref="/" />
      <ServicesSearch />
    </>
  )
}
