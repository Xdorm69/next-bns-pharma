"use client";

import { useState, useTransition, useCallback } from "react";
import { User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Copy,
  Trash2,
  Search,
  RefreshCw,
  Loader2,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { fetchUsersAction } from "../../_actions/fetchActions";
import { changeUserRoleAction, deleteUserAction } from "../../_actions/userActions";

const MAX = 8;

type Filters = {
  search: string;
  role: string;
  subscribed: string;
  provider: string;
  page: number;
};

const INITIAL_FILTERS: Filters = {
  search: "",
  role: "",
  subscribed: "",
  provider: "",
  page: 0,
};

export default function RenderUserTable({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [filters, setFilters] = useState<Filters>(INITIAL_FILTERS);
  const [totalCount, setTotalCount] = useState(initialUsers.length);
  const [isFetching, startFetch] = useTransition();
  const [isMutating, startMutate] = useTransition();

  const refetch = useCallback(
    (overrides?: Partial<Filters>) => {
      const merged = { ...filters, ...overrides };
      startFetch(async () => {
        try {
          const r = await fetchUsersAction({
            search: merged.search,
            role: merged.role,
            subscribed: merged.subscribed,
            provider: merged.provider,
            page: merged.page,
            take: MAX,
          });
          const data = r.success ? r.data : [];
          setUsers(data);
          setTotalCount(data.length);
        } catch {
          toast.error("Failed to fetch users");
        }
      });
    },
    [filters]
  );

  const updateFilter = (key: keyof Filters, value: string | number) => {
    const newFilters = {
      ...filters,
      [key]: value,
      page: key === "page" ? value : 0,
    };
    setFilters(newFilters as Filters);
    refetch(newFilters as Partial<Filters>);
  };

  const handleRoleChange = (id: string, newRole: "ADMIN" | "USER") => {
    startMutate(async () => {
      try {
        await changeUserRoleAction(id, newRole);
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
        );
        toast.success(`Role changed to ${newRole}`);
      } catch {
        toast.error("Failed to change role");
      }
    });
  };

  const handleDelete = (id: string) => {
    startMutate(async () => {
      try {
        await deleteUserAction(id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        toast.success("User deleted");
      } catch {
        toast.error("Failed to delete user");
      }
    });
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / MAX));

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search users…"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            className="pl-9"
          />
        </div>

        <FilterSelect
          placeholder="Role"
          value={filters.role}
          onChange={(v) => updateFilter("role", v)}
          options={[
            { key: "All roles", value: "" },
            { key: "Admin", value: "ADMIN" },
            { key: "User", value: "USER" },
          ]}
        />

        <FilterSelect
          placeholder="Subscribed"
          value={filters.subscribed}
          onChange={(v) => updateFilter("subscribed", v)}
          options={[
            { key: "All", value: "" },
            { key: "Yes", value: "true" },
            { key: "No", value: "false" },
          ]}
        />

        <FilterSelect
          placeholder="Provider"
          value={filters.provider}
          onChange={(v) => updateFilter("provider", v)}
          options={[
            { key: "All", value: "" },
            { key: "Google", value: "google" },
            { key: "Email", value: "email" },
          ]}
        />

        <Button
          variant="outline"
          size="icon"
          onClick={() => refetch()}
          disabled={isFetching}
          title="Refresh"
        >
          <RefreshCw className={cn("w-4 h-4", isFetching && "animate-spin")} />
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Subscribed</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell colSpan={8} className="py-16 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-16 text-center text-muted-foreground"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell>
                      <CopyHoverCard data={user.id} tag="ID" />
                    </TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role as "ADMIN" | "USER"} />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {user.provider ?? "—"}
                      </Badge>
                    </TableCell>
                  
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isMutating}
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {user.role === "USER" ? (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "ADMIN")
                                }
                              >
                                <ShieldCheck className="w-4 h-4 mr-2 text-emerald-500" />
                                Make Admin
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRoleChange(user.id, "USER")
                                }
                              >
                                <UserIcon className="w-4 h-4 mr-2" />
                                Make User
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                  onSelect={(e) => e.preventDefault()}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete user?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove{" "}
                                    <span className="font-semibold">
                                      {user.name ?? user.email}
                                    </span>{" "}
                                    from the database.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Page {filters.page + 1} of {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page === 0 || isFetching}
            onClick={() => updateFilter("page", filters.page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={filters.page + 1 >= totalPages || isFetching}
            onClick={() => updateFilter("page", filters.page + 1)}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function FilterSelect({
  placeholder,
  value,
  onChange,
  options,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  options: { key: string; value: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value || "_all"} value={opt.value || "_all"}>
            {opt.key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function CopyHoverCard({ data, tag }: { data: string; tag: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success(`${tag} copied`);
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "p-0 h-auto font-mono text-xs",
            tag === "ID" && "text-primary"
          )}
        >
          {data.length > 10 ? data.slice(0, 10) + "…" : data}
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{tag}</h4>
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs text-muted-foreground break-all">{data}</p>
            <Copy
              onClick={handleCopy}
              className="w-4 h-4 shrink-0 text-muted-foreground hover:text-primary cursor-pointer mt-0.5"
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function RoleBadge({ role }: { role: "ADMIN" | "USER" }) {
  return (
    <Badge
      className={cn(
        role === "ADMIN"
          ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
          : "bg-amber-500/10 text-amber-700 border-amber-200"
      )}
      variant="outline"
    >
      {role}
    </Badge>
  );
}
