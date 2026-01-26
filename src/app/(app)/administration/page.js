"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { Broom, DotsThree, MagnifyingGlass, Notebook, Plus, UsersThree } from "@phosphor-icons/react";
import { t } from "@/i18n";
import CardBg from "@/components/CardBg";
import ScreenTitleBar from "@/components/ScreenTitleBar";
import SectionTitleBar from "@/components/SectionTitleBar";
import TabBar from "@/components/TabBar";
import {
  activityLog,
  currentUser,
  getUsers,
  subscribeUsers,
} from "@/lib/mockAdmin";

export default function AdministrationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("users");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [users, setUsers] = useState(getUsers());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });
  const isAdmin = currentUser.role === "admin";

  const roleOrder = { admin: 1, regular: 2 };
  const statusOrder = { active: 1, deactivated: 2, invited: 3 };
  const parseDate = (value) => {
    const [day, month, year] = String(value || "").split(".");
    if (!day || !month || !year) {
      return 0;
    }
    return Number(`${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`);
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredUsers = normalizedQuery
    ? users.filter((user) => String(user.name || "").toLowerCase().includes(normalizedQuery))
    : users;

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const direction = sortDescriptor.direction === "descending" ? -1 : 1;
    const column = sortDescriptor.column;
    if (column === "registrationDate") {
      return (parseDate(a.memberSince) - parseDate(b.memberSince)) * direction;
    }
    if (column === "role") {
      return ((roleOrder[a.role] || 99) - (roleOrder[b.role] || 99)) * direction;
    }
    if (column === "status") {
      return ((statusOrder[a.status] || 99) - (statusOrder[b.status] || 99)) * direction;
    }
    if (column === "email") {
      return String(a.email).localeCompare(String(b.email)) * direction;
    }
    return String(a.name).localeCompare(String(b.name)) * direction;
  });

  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / rowsPerPage));
  const startIndex = (page - 1) * rowsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

  useEffect(() => subscribeUsers(setUsers), []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!isAdmin) {
    return (
      <div className="space-y-6">
        <ScreenTitleBar title={t("administration.title")} />
        <CardBg>
          <p className="text-sm text-slate-600">{t("administration.restricted")}</p>
        </CardBg>
      </div>
    );
  }

  return (
    <div>
      <ScreenTitleBar title={t("administration.title")} />
      <TabBar
        tabs={[
          {
            key: "users",
            label: (
              <span className="flex items-center gap-2">
                <UsersThree size={16} weight="fill" />
                {t("administration.tabs.users")}
              </span>
            ),
          },
          {
            key: "activity",
            label: (
              <span className="flex items-center gap-2">
                <Notebook size={16} weight="fill" />
                {t("administration.tabs.activity")}
              </span>
            ),
          },
        ]}
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          setPage(1);
        }}
        className="m-0"
      />
      {activeTab === "users" ? (
        <>
          <SectionTitleBar
            title={`${filteredUsers.length} ${t("administration.users.countLabel")}`}
            showButton
            buttonLabel={t("administration.users.new")}
            buttonIcon={<Plus size={16} weight="bold" />}
            buttonColor="success"
            searchBar={
              <Input
                size="md"
                radius="full"
                placeholder={t("administration.users.searchPlaceholder")}
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-[240px]"
                startContent={<MagnifyingGlass size={16} weight="regular" />}
              />
            }
          />
          <CardBg contentWrapperClassName="px-6 pt-6 pb-6" contentClassName="">
            <Table
              aria-label={t("administration.users.table.aria")}
              removeWrapper
              onRowAction={(key) => router.push(`/administration/users/${key}`)}
              sortDescriptor={sortDescriptor}
              onSortChange={setSortDescriptor}
            >
                <TableHeader>
                  <TableColumn>{t("administration.users.table.name")}</TableColumn>
                  <TableColumn>{t("administration.users.table.email")}</TableColumn>
                  <TableColumn allowsSorting id="registrationDate">
                    {t("administration.users.table.registrationDate")}
                  </TableColumn>
                  <TableColumn allowsSorting id="role">
                    {t("administration.users.table.role")}
                  </TableColumn>
                  <TableColumn allowsSorting id="status">
                    {t("administration.users.table.status")}
                  </TableColumn>
                  <TableColumn align="end">
                    {t("administration.users.table.actions")}
                  </TableColumn>
                </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                    <TableRow key={user.id} className="cursor-pointer border-b border-slate-200 hover:bg-slate-50">
                      <TableCell className="font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <Avatar
                            name={user.name}
                            src={user.avatar}
                            size="sm"
                            className="bg-slate-100 text-slate-600"
                          />
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                    <TableCell className="text-slate-600">{user.email}</TableCell>
                    <TableCell className="text-slate-600">{user.memberSince}</TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        color={user.role === "admin" ? "secondary" : "default"}
                        variant="flat"
                      >
                        {t(`administration.users.role.${user.role}`)}
                      </Chip>
                    </TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Chip size="sm" color="success" variant="flat">
                            {t("administration.users.status.active")}
                          </Chip>
                        ) : user.status === "deactivated" ? (
                          <Chip size="sm" color="danger" variant="flat">
                            {t("administration.users.status.deactivated")}
                          </Chip>
                        ) : null}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end">
                          <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                              <Button
                                isIconOnly
                                size="sm"
                                variant="light"
                                radius="full"
                                aria-label={t("administration.users.actions")}
                              >
                                <DotsThree size={16} weight="bold" />
                              </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label={t("administration.users.actions")}>
                              <DropdownItem key="remove">
                                {t("administration.users.remove")}
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </div>
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex items-center justify-between pt-6">
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-600">
                  {t("administration.users.rowsPerPage")}
                </span>
                <Select
                  size="sm"
                  radius="sm"
                  className="w-[80px]"
                  selectedKeys={new Set([String(rowsPerPage)])}
                  disallowEmptySelection
                  selectionMode="single"
                  renderValue={(items) =>
                    items
                      .map((item) => item.rendered ?? item.textValue ?? item.props?.children)
                      .filter(Boolean)
                      .join(", ")
                  }
                  onSelectionChange={(keys) => {
                    const [key] = Array.from(keys);
                    if (key) {
                      setRowsPerPage(Number(key));
                      setPage(1);
                    }
                  }}
                  aria-label={t("administration.users.rowsPerPage")}
                >
                  {[10, 20, 50].map((size) => (
                    <SelectItem key={String(size)}>{size}</SelectItem>
                  ))}
                </Select>
              </div>
              <Pagination
                page={page}
                total={totalPages}
                onChange={setPage}
                showControls
                size="sm"
                radius="sm"
              />
            </div>
          </CardBg>
        </>
      ) : (
        <>
          <SectionTitleBar
            title={`${activityLog.length} ${t("administration.activity.countLabel")}`}
            showButton
            buttonLabel={t("administration.activity.clear")}
            buttonVariant="bordered"
            buttonColor="default"
            buttonClassName="text-slate-700 border-slate-300"
            onButtonPress={onOpen}
            buttonIcon={<Broom size={16} weight="fill" />}
          />
          <CardBg>
            <div className="divide-y divide-slate-200">
              {activityLog.map((entry) => (
                <div key={entry.id} className="flex items-start justify-between py-3">
                  <p className="text-sm text-slate-700">{t(entry.labelKey)}</p>
                  <p className="text-xs text-slate-400">{entry.time}</p>
                </div>
              ))}
            </div>
          </CardBg>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="sm">
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="text-base font-semibold text-slate-900">
                    {t("administration.activity.clearTitle")}
                  </ModalHeader>
                  <ModalBody>
                    <p className="text-sm text-slate-600">
                      {t("administration.activity.clearBody")}
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="bordered" radius="full" onPress={onClose}>
                      {t("administration.activity.cancel")}
                    </Button>
                    <Button color="danger" radius="full" onPress={onClose}>
                      {t("administration.activity.confirm")}
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}
