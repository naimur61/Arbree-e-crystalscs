"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════
   CODE BLOCK COMPONENT
   ═══════════════════════════════════════════════════ */

function CodeBlock({ code, title }: { code: string; title?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement("textarea");
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      {title && (
        <div className="flex justify-between items-center py-2 px-4 border-b border-border bg-secondary/50">
          <span className="text-xs font-semibold text-secondary">{title}</span>
          <button
            type="button"
            onClick={copy}
            className="text-xs transition-colors text-tertiary hover:text-primary"
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-secondary">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SECTION COMPONENT
   ═══════════════════════════════════════════════════ */

function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="space-y-4 scroll-mt-20">
      <h2 className="text-2xl font-bold tracking-tight text-primary">
        {title}
      </h2>
      {desc && <p className="text-sm text-secondary">{desc}</p>}
      {children}
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PROPS TABLE COMPONENT
   ═══════════════════════════════════════════════════ */

function PropsTable({
  props,
}: {
  props: Array<{ name: string; type: string; default?: string; desc: string }>;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="py-2.5 px-4 font-semibold text-left text-secondary">
              Prop
            </th>
            <th className="py-2.5 px-4 font-semibold text-left text-secondary">
              Type
            </th>
            <th className="py-2.5 px-4 font-semibold text-left text-secondary">
              Default
            </th>
            <th className="py-2.5 px-4 font-semibold text-left text-secondary">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {props.map((p) => (
            <tr key={p.name}>
              <td className="py-2.5 px-4 font-mono text-xs text-accent-primary">
                {p.name}
              </td>
              <td className="py-2.5 px-4 text-xs text-secondary">{p.type}</td>
              <td className="py-2.5 px-4 text-xs text-tertiary">
                {p.default ?? "—"}
              </td>
              <td className="py-2.5 px-4 text-xs text-secondary">{p.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════ */

export default function HooksGuideContainer() {
  return (
    <div className="py-10 px-4 mx-auto space-y-16 max-w-5xl sm:px-6 lg:px-8">
      {/* ── Header ── */}
      <header className="space-y-3 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent-primary">
          E-Crystal Hooks
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          queryHooks Guide
        </h1>
        <p className="mx-auto max-w-xl text-sm text-secondary">
          Complete guide for data fetching, mutations, pagination, and safe
          updates using React Query.
        </p>
      </header>

      {/* ── TOC ── */}
      <nav className="p-4 rounded-xl border border-border bg-secondary">
        <ul className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
          {[
            ["#overview", "Overview"],
            ["#useFetchData", "useFetchData"],
            ["#useApiMutation", "useApiMutation"],
            ["#useInfiniteFetchData", "useInfiniteFetchData"],
            ["#useSafeUpdate", "useSafeUpdate"],
            ["#patterns", "Common Patterns"],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="font-medium text-secondary hover:text-primary"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ════════════════════════════════════════════════════════
          OVERVIEW
          ════════════════════════════════════════════════════════ */}
      <Section
        id="overview"
        title="Overview"
        desc="All hooks are exported from a single queryHooks object."
      >
        <CodeBlock
          title="Import"
          code={`import { queryHooks } from "@/hooks";

// Destructure what you need
const { useFetchData, useApiMutation, useInfiniteFetchData, useSafeUpdate } = queryHooks;`}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              name: "useFetchData",
              desc: "GET/POST data fetching with caching",
              icon: "📡",
            },
            {
              name: "useApiMutation",
              desc: "POST, PUT, PATCH, DELETE operations",
              icon: "✏️",
            },
            {
              name: "useInfiniteFetchData",
              desc: "Paginated data with infinite scroll",
              icon: "♾️",
            },
            {
              name: "useSafeUpdate",
              desc: "Conflict detection for updates",
              icon: "🛡️",
            },
          ].map((hook) => (
            <a
              key={hook.name}
              href={`#${hook.name}`}
              className="p-4 rounded-xl border transition-colors border-border bg-background hover:border-accent-primary/50"
            >
              <div className="flex gap-2 items-center">
                <span className="text-lg">{hook.icon}</span>
                <code className="text-sm font-semibold text-accent-primary">
                  {hook.name}
                </code>
              </div>
              <p className="mt-1 text-xs text-secondary">{hook.desc}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* ════════════════════════════════════════════════════════
          useFetchData
          ════════════════════════════════════════════════════════ */}
      <Section
        id="useFetchData"
        title="useFetchData"
        desc="Primary hook for fetching data. Supports GET and POST methods with automatic caching."
      >
        <PropsTable
          props={[
            {
              name: "path",
              type: "string",
              desc: "API endpoint path (e.g., 'courses')",
            },
            {
              name: "queryKey",
              type: "string | unknown[]",
              desc: "Unique cache key for this query",
            },
            {
              name: "method",
              type: '"GET" | "POST"',
              default: '"GET"',
              desc: "HTTP method",
            },
            {
              name: "filterData",
              type: "Record<string, any>",
              default: "{}",
              desc: "Query parameters or POST body",
            },
            {
              name: "token",
              type: "string",
              desc: "Explicit auth token (auto-detected if not provided)",
            },
            {
              name: "withOutToken",
              type: "boolean",
              default: "false",
              desc: "Skip authentication",
            },
            {
              name: "enabled",
              type: "boolean",
              default: "true",
              desc: "Enable/disable the query",
            },
          ]}
        />

        <CodeBlock
          title="Basic Usage"
          code={`const { data, isLoading, error } = queryHooks.useFetchData({
  path: "courses",
  queryKey: "courses-list",
});

if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;

return <CourseList courses={data.data} />;`}
        />

        <CodeBlock
          title="With Filters"
          code={`const { data } = queryHooks.useFetchData({
  path: "courses",
  queryKey: "courses-list",
  method: "POST",
  filterData: {
    status: "active",
    page: 1,
    limit: 10,
  },
});`}
        />

        <CodeBlock
          title="Without Auth Token"
          code={`const { data } = queryHooks.useFetchData({
  path: "public/courses",
  queryKey: "public-courses",
  withOutToken: true,
});`}
        />

        <CodeBlock
          title="Conditional Fetching"
          code={`const [courseId, setCourseId] = useState<string | null>(null);

const { data } = queryHooks.useFetchData({
  path: \`courses/\${courseId}\`,
  queryKey: \`course-\${courseId}\`,
  enabled: !!courseId, // Only fetch when courseId is set
});`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          useApiMutation
          ════════════════════════════════════════════════════════ */}
      <Section
        id="useApiMutation"
        title="useApiMutation"
        desc="Hook for write operations — create, update, delete. Supports JSON and FormData."
      >
        <PropsTable
          props={[
            {
              name: "method",
              type: '"POST" | "PUT" | "PATCH" | "DELETE"',
              desc: "HTTP method (required)",
            },
            {
              name: "path",
              type: "string",
              desc: "API endpoint path (or pass in mutate call)",
            },
            {
              name: "token",
              type: "string",
              desc: "Explicit auth token",
            },
            {
              name: "safe",
              type: "boolean",
              default: "true",
              desc: "Remove empty fields from payload",
            },
            {
              name: "dataType",
              type: '"json" | "multipart/form-data"',
              default: '"json"',
              desc: "Content type for request",
            },
            {
              name: "responseType",
              type: '"json" | "blob" | "arraybuffer" | "text"',
              default: '"json"',
              desc: "Expected response format",
            },
            {
              name: "onSuccess",
              type: "(data: T) => void",
              desc: "Success callback",
            },
            {
              name: "onError",
              type: "(error: ApiMutationError) => void",
              desc: "Error callback",
            },
            {
              name: "isSuccessToast",
              type: "boolean",
              default: "true",
              desc: "Show success toast",
            },
            {
              name: "isErrorToast",
              type: "boolean",
              default: "true",
              desc: "Show error toast",
            },
          ]}
        />

        <CodeBlock
          title="Create Item"
          code={`const createCourse = queryHooks.useApiMutation({
  method: "POST",
  path: "courses",
  onSuccess: (data) => {
    console.log("Course created:", data);
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  },
});

// Usage
createCourse.mutate({
  title: "New Course",
  description: "Course description",
  price: 99.99,
});`}
        />

        <CodeBlock
          title="Update Item"
          code={`const updateCourse = queryHooks.useApiMutation({
  method: "PATCH",
  // Path can be dynamic
});

// Pass path in mutate call
updateCourse.mutate({
  path: "courses/123",
  title: "Updated Title",
});`}
        />

        <CodeBlock
          title="Delete Item"
          code={`const deleteCourse = queryHooks.useApiMutation({
  method: "DELETE",
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  },
});

// Usage
deleteCourse.mutate({ path: "courses/123" });`}
        />

        <CodeBlock
          title="File Upload"
          code={`const uploadFile = queryHooks.useApiMutation({
  method: "POST",
  path: "upload",
  dataType: "multipart/form-data",
  isSuccessToast: true,
});

// Usage with FormData
const formData = new FormData();
formData.append("file", file);
formData.append("courseId", "123");

uploadFile.mutate(formData);`}
        />

        <CodeBlock
          title="File Download (Blob)"
          code={`const downloadFile = queryHooks.useApiMutation({
  method: "POST",
  path: "export/pdf",
  responseType: "blob",
  isSuccessToast: false,
});

// Usage
const result = await downloadFile.mutateAsync({ format: "pdf" });

// Create download link
const url = window.URL.createObjectURL(result as Blob);
const a = document.createElement("a");
a.href = url;
a.download = "export.pdf";
a.click();`}
        />

        <CodeBlock
          title="With Loading State"
          code={`const mutation = queryHooks.useApiMutation({
  method: "POST",
  path: "courses",
});

return (
  <form onSubmit={() => mutation.mutate(formData)}>
    {/* form fields */}
    <button disabled={mutation.isPending}>
      {mutation.isPending ? "Creating..." : "Create Course"}
    </button>
    {mutation.isError && (
      <p className="text-red-500">{mutation.error.message}</p>
    )}
  </form>
);`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          useInfiniteFetchData
          ════════════════════════════════════════════════════════ */}
      <Section
        id="useInfiniteFetchData"
        title="useInfiniteFetchData"
        desc="For paginated data with infinite scroll or 'Load More' functionality."
      >
        <PropsTable
          props={[
            {
              name: "path",
              type: "string",
              desc: "API endpoint path",
            },
            {
              name: "queryKey",
              type: "string | unknown[]",
              desc: "Cache key",
            },
            {
              name: "method",
              type: '"GET" | "POST"',
              default: '"GET"',
              desc: "HTTP method",
            },
            {
              name: "filterData",
              type: "Record<string, any>",
              default: "{}",
              desc: "Base filters (page added automatically)",
            },
            {
              name: "enabled",
              type: "boolean",
              default: "true",
              desc: "Enable/disable the query",
            },
            {
              name: "initialPageParam",
              type: "number",
              default: "1",
              desc: "Starting page number",
            },
          ]}
        />

        <CodeBlock
          title="Basic Usage"
          code={`const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
} = queryHooks.useInfiniteFetchData({
  path: "courses",
  queryKey: "courses-infinite",
  filterData: { status: "active" },
});`}
        />

        <CodeBlock
          title="Render List"
          code={`return (
  <div>
    {data?.pages.map((page, i) => (
      <div key={i}>
        {page.data?.data?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    ))}

    <button
      onClick={() => fetchNextPage()}
      disabled={!hasNextPage || isFetchingNextPage}
    >
      {isFetchingNextPage
        ? "Loading more..."
        : hasNextPage
          ? "Load More"
          : "No more items"}
    </button>
  </div>
);`}
        />

        <CodeBlock
          title="Infinite Scroll"
          code={`import { useIntersectionObserver } from "@/hooks";

function InfiniteScrollList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    queryHooks.useInfiniteFetchData({
      path: "courses",
      queryKey: "courses-infinite",
    });

  const loadMoreRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  return (
    <div>
      {data?.pages.flatMap((page, i) =>
        page.data?.data?.map((item) => (
          <CourseCard key={item.id} course={item} />
        ))
      )}
      <div ref={loadMoreRef} className="h-10" />
    </div>
  );
}`}
        />

        <CodeBlock
          title="With Custom Pagination"
          code={`const { data, fetchNextPage, hasNextPage } =
  queryHooks.useInfiniteFetchData({
    path: "courses",
    queryKey: "courses-custom",
    getNextPageParam: (lastPage) => {
      // Custom logic to determine next page
      const pagination = lastPage?.data?.pagination;
      if (!pagination) return undefined;
      return pagination.page < pagination.totalPages
        ? pagination.page + 1
        : undefined;
    },
  });`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          useSafeUpdate
          ════════════════════════════════════════════════════════ */}
      <Section
        id="useSafeUpdate"
        title="useSafeUpdate"
        desc="Prevents accidental overwrites by checking if the entity was modified recently."
      >
        <PropsTable
          props={[
            {
              name: "fieldName",
              type: "string",
              desc: "Entity field name in API response",
            },
            {
              name: "fetchPath",
              type: "string",
              desc: "Path to fetch current state",
            },
            {
              name: "updatePath",
              type: "string",
              desc: "Path to update entity",
            },
            {
              name: "queryKey",
              type: "string",
              desc: "Cache key to invalidate after update",
            },
            {
              name: "timeLimitMinutes",
              type: "number",
              default: "15",
              desc: "Minutes before requiring confirmation",
            },
            {
              name: "fetchMethod",
              type: '"GET" | "POST"',
              default: '"GET"',
              desc: "Method for fetching current state",
            },
            {
              name: "fetchFilter",
              type: "Record<string, any>",
              desc: "Filters for the fetch",
            },
            {
              name: "onSuccess",
              type: "() => void",
              desc: "Success callback",
            },
          ]}
        />

        <CodeBlock
          title="Basic Usage"
          code={`const {
  safeUpdate,
  confirmOverride,
  needsOverride,
  isUpdating,
  updateData,
} = queryHooks.useSafeUpdate({
  fieldName: "course",
  fetchPath: "courses/123",
  updatePath: "courses/123",
  queryKey: "courses",
  timeLimitMinutes: 15,
});

// Attempt update
const result = await safeUpdate({ title: "New Title" });

if (!result.immediate) {
  // Show confirmation modal
  setShowOverrideModal(true);
}

// User confirms
await confirmOverride();`}
        />

        <CodeBlock
          title="With UI"
          code={`function EditCourse({ courseId }) {
  const {
    safeUpdate,
    confirmOverride,
    needsOverride,
    isUpdating,
    updateData,
  } = queryHooks.useSafeUpdate({
    fieldName: "course",
    fetchPath: \`courses/\${courseId}\`,
    updatePath: \`courses/\${courseId}\`,
    queryKey: "courses",
  });

  const handleSave = async (formData) => {
    const result = await safeUpdate(formData);
    if (!result.immediate) {
      setShowConfirmModal(true);
    }
  };

  return (
    <div>
      <CourseForm
        initialData={updateData}
        onSubmit={handleSave}
        isLoading={isUpdating}
      />

      {needsOverride && (
        <ConfirmModal
          title="Conflict Detected"
          message="This course was recently modified. Do you want to override?"
          onConfirm={confirmOverride}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
    </div>
  );
}`}
        />
      </Section>

      {/* ════════════════════════════════════════════════════════
          COMMON PATTERNS
          ════════════════════════════════════════════════════════ */}
      <Section id="patterns" title="Common Patterns">
        <CodeBlock
          title="Optimistic Updates"
          code={`const updateCourse = queryHooks.useApiMutation({
  method: "PATCH",
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  },
});

// Optimistic update
const handleToggle = async (courseId: string, isActive: boolean) => {
  // Update UI immediately
  queryClient.setQueryData(["courses"], (old) => {
    return old?.map((course) =>
      course.id === courseId ? { ...course, isActive: !isActive } : course
    );
  });

  // Send request
  try {
    await updateCourse.mutateAsync({
      path: \`courses/\${courseId}\`,
      isActive: !isActive,
    });
  } catch {
    // Revert on error
    queryClient.invalidateQueries({ queryKey: ["courses"] });
  }
};`}
        />

        <CodeBlock
          title="Dependent Queries"
          code={`// First query: get user
const { data: user } = queryHooks.useFetchData({
  path: "auth/me",
  queryKey: "current-user",
});

// Second query: get user's courses (depends on user)
const { data: courses } = queryHooks.useFetchData({
  path: \`users/\${user?.data?.id}/courses\`,
  queryKey: "user-courses",
  enabled: !!user?.data?.id, // Wait for user
});`}
        />

        <CodeBlock
          title="Prefetching"
          code={`import { useQueryClient } from "@tanstack/react-query";

function CourseList() {
  const queryClient = useQueryClient();

  const handleHover = (courseId: string) => {
    // Prefetch course details on hover
    queryClient.prefetchQuery({
      queryKey: ["course", courseId],
      queryFn: () =>
        fetchData({
          queryKey: [{}, { path: \`courses/\${courseId}\`, Method: "GET", token: "" }],
        }),
      staleTime: 60 * 1000, // 1 minute
    });
  };

  return (
    <div>
      {courses.map((course) => (
        <Link
          key={course.id}
          href={\`/courses/\${course.id}\`}
          onMouseEnter={() => handleHover(course.id)}
        >
          {course.title}
        </Link>
      ))}
    </div>
  );
}`}
        />

        <CodeBlock
          title="Error Handling"
          code={`const { data, error, isError } = queryHooks.useFetchData({
  path: "courses",
  queryKey: "courses-list",
});

if (isError) {
  // Handle specific error types
  if (error.message.includes("401")) {
    router.push("/login");
  } else if (error.message.includes("403")) {
    router.push("/forbidden");
  } else {
    toast.error("Failed to load courses");
  }
}`}
        />

        <CodeBlock
          title="Mutate with Path"
          code={`// Single mutation for multiple endpoints
const mutation = queryHooks.useApiMutation({
  method: "PATCH",
});

// Update course
mutation.mutate({
  path: "courses/123",
  title: "Updated Title",
});

// Update user
mutation.mutate({
  path: "users/456",
  name: "Updated Name",
});

// Update order
mutation.mutate({
  path: "orders/789",
  status: "completed",
});`}
        />
      </Section>

      <footer className="pt-6 text-xs text-center border-t border-border text-tertiary">
        E-Crystal Hooks Guide · React Query + TanStack
      </footer>
    </div>
  );
}
