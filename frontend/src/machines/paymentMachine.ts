import { assign, createMachine } from "xstate";

import { Member, Payment } from "../__generated__/api";
import { queryClient } from "../pages/_app";
import { membersApi, paymentsApi } from "../utils/fetcher";

interface Context {
  targetMemberId: string | null;
  member: Member | null;
  memberError: string | null;
  payments: Payment[];
  paymentsError: string | null;
  submitPaymetError: string | null;
}

export namespace State {
  export namespace Idle {
    export type t = {
      value: "idle";
      context: Context & {
        member: null;
        memberError: null;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (context: Context): t => ({
      value: "idle",
      context: {
        ...context,
        member: null,
        paymentsError: null,
        memberError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace FetchingMember {
    export type t = {
      value: "fetchingMember";
      context: Context & {
        member: null;
        memberError: null;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (context: Context): t => ({
      value: "fetchingMember",
      context: {
        ...context,
        member: null,
        paymentsError: null,
        memberError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace FetchingMemberSuccess {
    export type t = {
      value: "fetchingMemberSuccess";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (context: Context, member: Member): t => ({
      value: "fetchingMemberSuccess",
      context: {
        ...context,
        member,
        memberError: null,
        paymentsError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace FetchingMemberError {
    export type t = {
      value: "fetchingMemberError";
      context: Context & {
        member: null;
        memberError: string;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (context: Context, memberError: string): t => ({
      value: "fetchingMemberError",
      context: {
        ...context,
        member: null,
        memberError,
        paymentsError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace FetchingPayment {
    export type t = {
      value: "fetchingPayments";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (context: Context, member: Member): t => ({
      value: "fetchingPayments",
      context: {
        ...context,
        member,
        paymentsError: null,
        memberError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace FetchingPaymentSuccess {
    export type t = {
      value: "fetchingPaymentSuccess";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (
      context: Context,
      payments: Payment[],
      member: Member
    ): t => ({
      value: "fetchingPaymentSuccess",
      context: {
        ...context,
        payments,
        member,
        memberError: null,
        paymentsError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }
  export namespace FetchingPaymentError {
    export type t = {
      value: "fetchingPaymentError";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: string;
        targetMemberId: null;
        submitPaymetError: null;
      };
    };

    export const make = (
      context: Context,
      paymentsError: string,
      member: Member
    ): t => ({
      value: "fetchingPaymentError",
      context: {
        ...context,
        paymentsError,
        member,
        memberError: null,
        targetMemberId: null,
        submitPaymetError: null
      }
    });
  }

  export namespace ConfirmingPayment {
    export type t = {
      value: "confirmingPayment";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: string;
        submitPaymetError: null;
      };
    };

    export const make = (
      context: Context,
      member: Member,
      targetMemberId: string
    ): t => ({
      value: "confirmingPayment",
      context: {
        ...context,
        member,
        paymentsError: null,
        memberError: null,
        targetMemberId,
        submitPaymetError: null
      }
    });
  }

  export namespace SubmittingPayment {
    export type t = {
      value: "submittingPayment";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: string;
        submitPaymetError: null;
      };
    };

    export const make = (
      context: Context,
      member: Member,
      targetMemberId: string
    ): t => ({
      value: "submittingPayment",
      context: {
        ...context,
        member,
        paymentsError: null,
        memberError: null,
        targetMemberId,
        submitPaymetError: null
      }
    });
  }

  export namespace SubmittingPaymentError {
    export type t = {
      value: "submittingPaymentError";
      context: Context & {
        member: Member;
        memberError: null;
        paymentsError: null;
        targetMemberId: string;
        submitPaymetError: string;
      };
    };

    export const make = (
      context: Context,
      submitPaymetError: string,
      member: Member,
      targetMemberId: string
    ): t => ({
      value: "submittingPaymentError",
      context: {
        ...context,
        member,
        paymentsError: null,
        memberError: null,
        targetMemberId,
        submitPaymetError
      }
    });
  }

  export type t =
    | Idle.t
    | FetchingMember.t
    | FetchingMemberError.t
    | FetchingMemberSuccess.t
    | FetchingPayment.t
    | FetchingPaymentSuccess.t
    | FetchingPaymentError.t
    | ConfirmingPayment.t
    | SubmittingPayment.t
    | SubmittingPaymentError.t;
}

export type MachineEvents =
  | { type: "FETCH_MEMBER" }
  | { type: "FETCH_MEMBER_SUCCESS"; memberData: Member }
  | { type: "FETCH_MEMBER_ERROR"; memberErrorMessage: string }
  | { type: "REFETCH_MEMBER" }
  | { type: "FETCH_PAYMENTS" }
  | { type: "FETCH_PAYMENTS_SUCCESS"; paymentsData: Payment[] }
  | { type: "FETCH_PAYMENTS_ERROR"; paymentErrorMessage: string }
  | { type: "REFETCH_PAYMENTS" }
  | {
      type: "SELECT_PAYMENT_TARGET";
      targetMemberId: string;
    }
  | { type: "CANCEL_PAYMENT" }
  | { type: "CONFIRM_PAYMENT" }
  | { type: "SUBMIT_PAYMENT_SUCCESS" }
  | { type: "SUBMIT_PAYMENT_ERROR"; submitPaymentErrorMessage: string }
  | { type: "RESUBMIT_PAYMENT" };

export interface Params {
  memberId: string;
}

export const createPaymentMachine = (params: Params) =>
  createMachine<Context, MachineEvents, State.t>({
    id: "Payment",
    initial: "idle",
    context: {
      member: null,
      targetMemberId: null,
      memberError: null,
      payments: [],
      paymentsError: null,
      submitPaymetError: null
    },
    states: {
      idle: {
        always: {
          target: "fetchingMember",
          actions: assign(
            (context) => State.FetchingMember.make(context).context
          )
        }
      },
      fetchingMember: {
        invoke: {
          src: "getMemberData"
        },
        on: {
          FETCH_MEMBER_SUCCESS: {
            target: "fetchingMemberSuccess",
            actions: assign(
              (context, event) =>
                State.FetchingMemberSuccess.make(context, event.memberData)
                  .context
            )
          },
          FETCH_MEMBER_ERROR: {
            target: "fetchingMemberError",
            actions: assign(
              (context, event) =>
                State.FetchingMemberError.make(
                  context,
                  event.memberErrorMessage
                ).context
            )
          }
        }
      },
      fetchingMemberSuccess: {
        always: {
          target: "fetchingPayments",
          actions: assign((context) =>
            context.member === null
              ? context
              : State.FetchingPayment.make(context, context.member).context
          )
        }
      },
      fetchingMemberError: {
        on: {
          REFETCH_MEMBER: {
            target: "fetchingMember",
            actions: assign(
              (context) => State.FetchingMember.make(context).context
            )
          }
        }
      },
      fetchingPayments: {
        invoke: {
          src: "getPaymentsData"
        },
        on: {
          FETCH_PAYMENTS_SUCCESS: {
            target: "fetchingPaymentSuccess",
            actions: assign((context, event) =>
              context.member === null
                ? context
                : State.FetchingPaymentSuccess.make(
                    context,
                    event.paymentsData,
                    context.member
                  ).context
            )
          },
          FETCH_PAYMENTS_ERROR: {
            target: "fetchingPaymentError",
            actions: assign((context, event) =>
              context.member === null
                ? context
                : State.FetchingPaymentError.make(
                    context,
                    event.paymentErrorMessage,
                    context.member
                  ).context
            )
          }
        }
      },
      fetchingPaymentSuccess: {
        on: {
          SELECT_PAYMENT_TARGET: {
            target: "confirmingPayment",
            actions: assign((context, event) => {
              return context.member === null || event.targetMemberId === null
                ? context
                : State.ConfirmingPayment.make(
                    context,
                    context.member,
                    event.targetMemberId
                  ).context;
            })
          }
        }
      },
      fetchingPaymentError: {
        on: {
          REFETCH_PAYMENTS: {
            target: "fetchingPayments",
            actions: assign((context) =>
              context.member === null
                ? context
                : State.FetchingPayment.make(context, context.member).context
            )
          }
        }
      },
      confirmingPayment: {
        on: {
          CONFIRM_PAYMENT: {
            target: "submittingPayment",
            actions: assign((context) => {
              return context.member === null || context.targetMemberId === null
                ? context
                : State.SubmittingPayment.make(
                    context,
                    context.member,
                    context.targetMemberId
                  ).context;
            })
          },
          CANCEL_PAYMENT: {
            target: "fetchingPaymentSuccess",
            actions: assign((context) =>
              context.member === null
                ? context
                : State.FetchingPaymentSuccess.make(
                    context,
                    context.payments,
                    context.member
                  ).context
            )
          }
        }
      },
      submittingPayment: {
        invoke: {
          src: "submitPayment"
        },
        on: {
          SUBMIT_PAYMENT_ERROR: {
            target: "submittingPaymentError",
            actions: assign((context, event) =>
              context.member === null || context.targetMemberId === null
                ? context
                : State.SubmittingPaymentError.make(
                    context,
                    event.submitPaymentErrorMessage,
                    context.member,
                    context.targetMemberId
                  ).context
            )
          },
          SUBMIT_PAYMENT_SUCCESS: {
            target: "fetchingPayments",
            actions: assign((context) =>
              context.member === null
                ? context
                : State.FetchingPayment.make(context, context.member).context
            )
          }
        }
      },
      submittingPaymentError: {
        on: {
          RESUBMIT_PAYMENT: {
            target: "submittingPayment",
            actions: assign((context) => {
              return context.member === null || context.targetMemberId === null
                ? context
                : State.ConfirmingPayment.make(
                    context,
                    context.member,
                    context.targetMemberId
                  ).context;
            })
          },
          CANCEL_PAYMENT: {
            target: "fetchingPaymentSuccess",
            actions: assign((context) =>
              context.member === null
                ? context
                : State.FetchingPaymentSuccess.make(
                    context,
                    context.payments,
                    context.member
                  ).context
            )
          }
        }
      }
    }
  }).withConfig({
    services: {
      getMemberData: () => (send) => {
        queryClient
          .fetchQuery("member", () =>
            membersApi.getMemberDetail({ memberId: params.memberId })
          )
          .then((response) =>
            send({ type: "FETCH_MEMBER_SUCCESS", memberData: response.data })
          )
          .catch(() =>
            send({
              type: "FETCH_MEMBER_ERROR",
              memberErrorMessage: "Fetching Member error"
            })
          );
      },
      getPaymentsData: () => (send) => {
        queryClient
          .fetchQuery("payments", () =>
            paymentsApi.getPaymentByMemberId({ memberId: params.memberId })
          )
          .then((response) =>
            send({
              type: "FETCH_PAYMENTS_SUCCESS",
              paymentsData: response.data
            })
          )
          .catch(() =>
            send({
              type: "FETCH_PAYMENTS_ERROR",
              paymentErrorMessage: "Fetching Payments error"
            })
          );
      },
      submitPayment: (context) => (send) => {
        paymentsApi
          .updatePayment({
            paymentRequest: {
              chargedMemberId: params.memberId,
              targetMemberId: context.targetMemberId ?? ""
            }
          })
          .then(() => send({ type: "SUBMIT_PAYMENT_SUCCESS" }))
          .catch(() =>
            send({
              type: "SUBMIT_PAYMENT_ERROR",
              submitPaymentErrorMessage: "Submit payment failed"
            })
          );
      }
    }
  });
