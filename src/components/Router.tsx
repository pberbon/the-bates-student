import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ArticlesPage from '@/components/pages/ArticlesPage';
import ArticleDetailPage from '@/components/pages/ArticleDetailPage';
import AuthorPage from '@/components/pages/AuthorPage';
import NewslettersPage from '@/components/pages/NewslettersPage';
import PrintIssuesPage from '@/components/pages/PrintIssuesPage';
import AboutPage from '@/components/pages/AboutPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "news",
        element: <ArticlesPage />,
      },
      {
        path: "features",
        element: <ArticlesPage />,
      },
      {
        path: "forum",
        element: <ArticlesPage />,
      },
      {
        path: "arts",
        element: <ArticlesPage />,
      },
      {
        path: "sports",
        element: <ArticlesPage />,
      },
      {
        path: "article/:id",
        element: <ArticleDetailPage />,
      },
      {
        path: "author/:authorName",
        element: <AuthorPage />,
      },
      {
        path: "newsletters",
        element: <NewslettersPage />,
      },
      {
        path: "print-issues",
        element: <PrintIssuesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
