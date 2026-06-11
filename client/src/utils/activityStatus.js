export const getActivityStatus = (activityDate) => {
  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const activityDay = new Date(activityDate);

  activityDay.setHours(0, 0, 0, 0);

  if (activityDay > today) {
    return "Upcoming";
  }

  if (activityDay.getTime() === today.getTime()) {
    return "Ongoing";
  }

  return "Completed";
};