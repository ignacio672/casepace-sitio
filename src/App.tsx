import { BrowserRouter, Navigate, Route, Routes, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/site/Layout";
import { ANCHORS, ROUTES } from "@/content/site";
import Landing from "@/pages/Landing";
import Legal from "@/pages/Legal";
import NotFound from "@/pages/NotFound";
import Trust from "@/pages/Trust";
import TrustArticle from "@/pages/TrustArticle";

/** `/demo` era una página aparte. Ahora el caso de muestra vive dentro de cada landing. */
function DemoRedirect() {
  const [params] = useSearchParams();
  const base = params.get("from") === "org" ? ROUTES.organizations : ROUTES.firms;
  return <Navigate to={`${base}#${ANCHORS.demo}`} replace />;
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to={ROUTES.firms} replace />} />
          <Route path={ROUTES.firms} element={<Landing audience="firms" />} />
          <Route path={ROUTES.organizations} element={<Landing audience="organizations" />} />
          <Route path="/demo" element={<DemoRedirect />} />
          <Route path="/trust" element={<Trust />} />
          <Route path="/trust/:slug" element={<TrustArticle />} />
          <Route path="/privacy" element={<Legal page="privacy" />} />
          <Route path="/terms" element={<Legal page="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
