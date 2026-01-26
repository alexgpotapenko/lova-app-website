const firstNames = [
  "Anna",
  "Jan",
  "Lena",
  "Tobias",
  "Sophie",
  "Marco",
  "Lea",
  "David",
  "Nina",
  "Simon",
];

const lastNames = [
  "Meier",
  "Keller",
  "Fischer",
  "Weber",
  "Moser",
  "Kunz",
  "Baumann",
  "Schmid",
  "Hug",
  "Gerber",
];

const femaleNames = new Set(["Anna", "Lena", "Sophie", "Lea", "Nina"]);
const maleNames = new Set(["Jan", "Tobias", "Marco", "David", "Simon", "Lucas"]);

const getAvatarForName = (firstName, seed) => {
  const gender = femaleNames.has(firstName) ? "women" : "men";
  const index = seed % 100;
  return `https://randomuser.me/api/portraits/${gender}/${index}.jpg`;
};

const formatDate = (year, month, day) => {
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  return `${formattedDay}.${formattedMonth}.${year}`;
};

const formatDateTime = (year, month, day, hour, minute, second) => {
  const formattedHour = String(hour).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");
  const formattedSecond = String(second).padStart(2, "0");
  return `${formatDate(year, month, day)} ${formattedHour}:${formattedMinute}:${formattedSecond}`;
};

const buildEmail = (first, last, suffix) => {
  const base = `${first}.${last}`.toLowerCase();
  return `${base}${suffix ? `.${suffix}` : ""}@swisens.ch`;
};

export const currentUser = {
  id: "user-1",
  firstName: "Lucas",
  lastName: "Egger",
  name: "Lucas Egger",
  email: "admin@swisens.ch",
  avatar: getAvatarForName("Lucas", 1),
  organization: "MeteoSwiss",
  role: "admin",
  status: "active",
  memberSince: "12.04.2022",
  lastActivity: "22.01.2026 09:14:22",
  orgDescription: "Swiss Federal Office of Meteorology and Climatology.",
};

const baseUsers = [
  {
    id: "user-1",
    firstName: "Lucas",
    lastName: "Egger",
    name: "Lucas Egger",
    email: "admin@swisens.ch",
    avatar: getAvatarForName("Lucas", 1),
    role: "admin",
    status: "active",
    memberSince: "12.04.2022",
    lastActivity: "22.01.2026 09:14:22",
  },
  {
    id: "user-2",
    firstName: "Anna",
    lastName: "Meier",
    name: "Anna Meier",
    email: "anna.meier@swisens.ch",
    avatar: getAvatarForName("Anna", 2),
    role: "regular",
    status: "active",
    memberSince: "09.02.2023",
    lastActivity: "22.01.2026 06:41:05",
  },
  {
    id: "user-3",
    firstName: "Jan",
    lastName: "Keller",
    name: "Jan Keller",
    email: "jan.keller@swisens.ch",
    avatar: getAvatarForName("Jan", 3),
    role: "regular",
    status: "invited",
    memberSince: "03.11.2025",
    lastActivity: "20.01.2026 15:19:03",
  },
];

const existingNames = new Set(baseUsers.map((user) => user.name));
const existingEmails = new Set(baseUsers.map((user) => user.email));

const generatedUsers = [];
let index = 0;

while (generatedUsers.length < 47) {
  const id = generatedUsers.length + 4;
  const isInvited = id % 5 === 0;
  const isDeactivated = id % 7 === 0;
  const first = firstNames[index % firstNames.length];
  const last = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const suffix = Math.floor(index / (firstNames.length * lastNames.length));
  const nameSuffix = suffix > 0 ? ` ${suffix + 1}` : "";
  const name = `${first} ${last}${nameSuffix}`;
  const email = buildEmail(first, last, suffix > 0 ? suffix + 1 : "");

  if (!existingNames.has(name) && !existingEmails.has(email)) {
    existingNames.add(name);
    existingEmails.add(email);
    generatedUsers.push({
      id: `user-${id}`,
      firstName: first,
      lastName: `${last}${nameSuffix}`,
      name,
      email,
      avatar: id % 5 === 0 ? null : getAvatarForName(first, id),
      role: "regular",
      status: isDeactivated ? "deactivated" : isInvited ? "invited" : "active",
      memberSince: formatDate(2020 + ((id % 4) + 1), (id % 12) + 1, (id % 28) + 1),
      lastActivity: formatDateTime(
        2026,
        1,
        (id % 28) + 1,
        (id * 3) % 24,
        (id * 7) % 60,
        (id * 11) % 60
      ),
    });
  }

  index += 1;
}

let usersState = [...baseUsers, ...generatedUsers];
const listeners = new Set();

const notify = () => {
  listeners.forEach((callback) => callback(usersState));
};

export const getUsers = () => usersState;

export const getUserById = (userId) =>
  usersState.find((user) => user.id === userId);

export const subscribeUsers = (callback) => {
  listeners.add(callback);
  return () => listeners.delete(callback);
};

export const updateUserRole = (userId, role) => {
  usersState = usersState.map((user) =>
    user.id === userId ? { ...user, role } : user
  );
  if (currentUser.id === userId) {
    currentUser.role = role;
  }
  notify();
};

export const updateUserAvatar = (userId, avatar) => {
  usersState = usersState.map((user) =>
    user.id === userId ? { ...user, avatar } : user
  );
  if (currentUser.id === userId) {
    currentUser.avatar = avatar;
  }
  notify();
};

export const updateUserProfile = (userId, updates) => {
  usersState = usersState.map((user) => {
    if (user.id !== userId) {
      return user;
    }
    const nextUser = { ...user, ...updates };
    if (Object.prototype.hasOwnProperty.call(updates, "firstName") || Object.prototype.hasOwnProperty.call(updates, "lastName")) {
      const nextFirstName = updates.firstName ?? user.firstName ?? "";
      const nextLastName = updates.lastName ?? user.lastName ?? "";
      nextUser.firstName = nextFirstName;
      nextUser.lastName = nextLastName;
      nextUser.name = `${nextFirstName} ${nextLastName}`.trim();
    }
    return nextUser;
  });

  if (currentUser.id === userId) {
    if (Object.prototype.hasOwnProperty.call(updates, "firstName")) {
      currentUser.firstName = updates.firstName ?? currentUser.firstName;
    }
    if (Object.prototype.hasOwnProperty.call(updates, "lastName")) {
      currentUser.lastName = updates.lastName ?? currentUser.lastName;
    }
    if (Object.prototype.hasOwnProperty.call(updates, "email")) {
      currentUser.email = updates.email ?? currentUser.email;
    }
    currentUser.name = `${currentUser.firstName ?? ""} ${currentUser.lastName ?? ""}`.trim();
  }
  notify();
};

export const activityLog = [
  {
    id: "activity-1",
    labelKey: "administration.activity.invited",
    time: "2026-01-22 09:14:22",
  },
  {
    id: "activity-2",
    labelKey: "administration.activity.exported",
    time: "2026-01-22 06:41:05",
  },
  {
    id: "activity-3",
    labelKey: "administration.activity.viewed",
    time: "2026-01-21 18:03:44",
  },
  {
    id: "activity-4",
    labelKey: "administration.activity.roleChanged",
    time: "2026-01-19 11:27:59",
  },
  {
    id: "activity-5",
    labelKey: "administration.activity.login",
    time: "2026-01-22 04:56:10",
  },
  {
    id: "activity-6",
    labelKey: "administration.activity.areaSwitch",
    time: "2026-01-22 02:12:38",
  },
  {
    id: "activity-7",
    labelKey: "administration.activity.exportedGrass",
    time: "2026-01-20 15:19:03",
  },
  {
    id: "activity-8",
    labelKey: "administration.activity.userRemoved",
    time: "2026-01-18 10:05:27",
  },
  {
    id: "activity-9",
    labelKey: "administration.activity.dashboardOpened",
    time: "2026-01-12 08:44:51",
  },
  {
    id: "activity-10",
    labelKey: "administration.activity.languageChanged",
    time: "2026-01-10 16:08:12",
  },
  {
    id: "activity-11",
    labelKey: "administration.activity.invitedSecond",
    time: "2026-01-08 13:21:09",
  },
  {
    id: "activity-12",
    labelKey: "administration.activity.permissionUpdated",
    time: "2026-01-01 09:02:33",
  },
];

