package api

import (
	"github.com/mnindrazaka/billing/core/entity"
	"net/http"

	"github.com/julienschmidt/httprouter"
	"github.com/mnindrazaka/billing/core/module"
)

type billingHandler struct {
	billingUsecase module.BillingUsecase
}
type BillingHandler interface {
	GetBillingByID(w http.ResponseWriter, r *http.Request, ps httprouter.Params)
	GetBillings(w http.ResponseWriter, r *http.Request, ps httprouter.Params)
	CreateBilling(w http.ResponseWriter, r *http.Request, ps httprouter.Params)
	UpdateBilling(w http.ResponseWriter, r *http.Request, ps httprouter.Params)
}

func NewBillingHandler(billingUsecase module.BillingUsecase) BillingHandler {
	return &billingHandler{billingUsecase}
}

func (b *billingHandler) GetBillingByID(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	billing, err := b.billingUsecase.GetBillingByID(r.Context(), ps.ByName("billingID"))

	if err != nil {
		buildGetBillingByIDError(w, err)
		return
	}
	buildGetBillingByIDSuccess(w, billing)
}
func (b *billingHandler) GetBillings(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	billings, err := b.billingUsecase.GetBillingsList(r.Context())
	if err != nil {
		buildGetBililngsError(w, err)
		return
	}

	buildSuccessResponse(w, billings)
}
func (b *billingHandler) CreateBilling(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	billingCreateRequest := entity.BillingRequest{}

	ReadFromRequestBody(w, r, &billingCreateRequest)

	billingResponse, err := b.billingUsecase.CreateBilling(r.Context(), billingCreateRequest)

	if err != nil {
		buildGetBililngsError(w, err)
		return
	}

	buildSuccessResponse(w, &billingResponse)
}
func (b *billingHandler) UpdateBilling(w http.ResponseWriter, r *http.Request, ps httprouter.Params) {
	billingUpdateRequest := entity.BillingRequest{}

	ReadFromRequestBody(w, r, &billingUpdateRequest)

	_, err := b.billingUsecase.UpdateBilling(r.Context(), ps.ByName("billingID"), billingUpdateRequest)
	if err != nil {
		buildUpdateBililngError(w, err)
		return
	}
	buildSuccessResponse(w, nil)
}
