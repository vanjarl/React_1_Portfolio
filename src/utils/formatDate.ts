export default function formatDate(originalDateString: string) {
  if (originalDateString) {
    const originalDate = new Date(originalDateString);

    const day = originalDate.getUTCDate();

    const month = originalDate.getUTCMonth() + 1; // Месяцы начинаются с 0, поэтому добавляем 1
    const year = originalDate.getUTCFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}.${month
      .toString()
      .padStart(2, '0')}.${year}`;

    return formattedDate;
  } else return null;
}
