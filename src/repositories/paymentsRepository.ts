import { prisma } from "../config/prisma";

export interface Payment {
	id: number;
	cardId: number;
	businessId: number;
	timestamp: Date;
	amount: number;
}
export type PaymentWithBusinessName = Payment & { businessName: string };
export type PaymentInsertData = Omit<Payment, "id" | "timestamp">;

export async function findByCardId(cardId: number) {
	const result = await prisma.payment.findFirst({
		where: { cardId },
		select: {
			id: true,
			cardId: true,
			businessId: true,
			business: { select: { name: true } },
			timestamp: true,
			amount: true,
		},
	});

	return result;
}

// export async function findByCardId(cardId: number) {
// 	const result = await prisma.query<PaymentWithBusinessName, [number]>(
// 		`SELECT p.id, p."cardId", p."businessId", b.name as "businessName", to_char(p.timestamp, 'DD/MM/YYYY') AS timestamp, p.amount
//     FROM payments p
//     JOIN businesses b ON b.id = p."businessId"
//     WHERE "cardId" = $1`,
// 		[cardId]
// 	);

// 	return result.rows;
// }

export async function insert(paymentData: PaymentInsertData) {
	await prisma.payment.create({
		data: paymentData,
	});
}
