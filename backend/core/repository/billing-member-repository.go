package repository

import (
	"context"

	"github.com/mnindrazaka/billing/core/entity"
)

type BillingMemberData struct {
	BillingId       string
	ChargedMemberId string
	MemberId        string
	Amount          int32
	Status          string
}

type BillingMemberRepository interface {
	GetBillingMemberByBillingID(ctx context.Context, id string) ([]entity.BillingMember, error)
	CreateBillingMember(ctx context.Context, billingMemberData BillingMemberData) error
	DeleteBillingMember(ctx context.Context, billingId string) error
	UpdateBillingMemberByBillingID(ctx context.Context, chargedMemberID, targetMemberID string) error
	GetBillingMemberByChargedMemberID(ctx context.Context, chargedeMemberID string, excludeMemberID bool) ([]*entity.BillingMemberDB, error)
}
